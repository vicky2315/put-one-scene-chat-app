import {database} from './database';
import Message from './models/Message';
import Chat from './models/Chat';
import {Q} from '@nozbe/watermelondb';
import {map} from 'rxjs';

export const sendMessage = async (senderId: string, content: string) => {
  await database.write(async () => {
    const chat = await database.get<Chat>('chats').find(senderId);

    await database.get<Message>('messages').create(message => {
      message.chat.set(chat);
      message.content = content;
      message.senderId = senderId; // From your auth
      message.status = 'sent';
      message.createdAt = new Date();
    });

    await chat.update(() => {
      chat.lastMessage = content;
    });
  });
};

export const observeChats = () => {
  return database
    .get<Chat>('chats')
    .query(Q.sortBy('updated_at', Q.desc))
    .observeWithColumns(['name', 'last_message'])
    .pipe(
      map((chats: Chat[]) =>
        chats.map(chat => ({
          id: chat.id,
          name: chat.name,
          lastMessage: chat.lastMessage || '',
        })),
      ),
    );
};

export const observeMessages = (senderId: string) => {
  return database
    .get<Message>('messages')
    .query(Q.where('sender_id', senderId), Q.sortBy('created_at', Q.desc))
    .observe();
};
