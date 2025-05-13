import {database} from './database';
import Message from './models/Message';
import Chat from './models/Chat';
import {Q} from '@nozbe/watermelondb';
import {map} from 'rxjs';
import supabase from './supabaseClient';

export const sendMessage = async (senderId: string, content: string) => {
  let localMessage: Message;
  await database.write(async () => {
    const chat = await database.get<Chat>('chats').find(senderId);

    await database.get<Message>('messages').create(message => {
      message.chat.set(chat);
      message.content = content;
      message.senderId = senderId; // From your auth
      message.status = 'sent';
      message.createdAt = new Date();
    });

    localMessage = await database.get<Message>('messages').create(message => {
      message.chat.set(chat);
      message.content = content;
      message.senderId = senderId;
      message.status = 'sending'; // Initial local state
      message.createdAt = new Date();
    });

    await chat.update(() => {
      chat.lastMessage = content;
    });
  });

  try {
    const { error } = await supabase.from('messages').insert({
      //id: localMessage.id,
      //chat_id: chatId,
      sender_id: senderId,
      content: content,
      created_at: new Date().toISOString()
    });
    await database.write(async () => {
      await localMessage.update(() => {
        localMessage.status = error ? 'failed' : 'delivered';
      });
    });
    } catch (error) {
    await database.write(async () => {
      await localMessage.update(() => {
        localMessage.status = 'failed';
      });
    });
   }
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

export const subscribeToMessages = (chatId: string, callback: (message: Message) => void) => {
  return supabase
    .channel(`messages:${chatId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`
      },
      async (payload) => {
        // Check if message already exists locally
        const existing = await database.get<Message>('messages')
          .find(payload.new.id);
          
        if (!existing) {
          await database.write(async () => {
            const message = await database.get<Message>('messages').create(msg => {
              msg.content = payload.new.content;
              msg.senderId = payload.new.sender_id;
              msg.status = 'delivered';
              msg.createdAt = new Date(payload.new.created_at);
              msg.chat.id = payload.new.chat_id;
            });
            callback(message);
          });
        }
      }
    )
    .subscribe();
};

export const observeMessages = (senderId: string) => {
  return database
    .get<Message>('messages')
    .query(Q.where('sender_id', senderId), Q.sortBy('created_at', Q.desc))
    .observe();
};
