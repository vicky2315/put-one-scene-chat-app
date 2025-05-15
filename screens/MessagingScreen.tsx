/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './ChatsTab';
import {Input, InputField, InputIcon, InputSlot} from 'components/ui/input';
import {useEffect, useState} from 'react';
//import {Button, ButtonText} from 'components/ui/button';
import {observeMessages, sendMessage} from 'services/messageService';
import Message from 'services/models/Message';
import {database} from 'services/database';
import Chat from 'services/models/Chat';
import {SendHorizontal} from 'lucide-react-native';
import supabase from 'services/supabaseClient';
import {Button} from '@react-navigation/elements';

type UserScreenRouteProp = RouteProp<RootStackParamList, 'User'>;

function MessagingScreen() {
  const [messagesText, setMessagesText] = useState('');
  const [messagesArray, setMessagesArray] = useState<string[]>([]);
  const route = useRoute<UserScreenRouteProp>();
  const {user} = route.params;
  const {senderId} = route.params;
  const roomOne = supabase.channel('room-one');
  useEffect(() => {
    console.log('sender_id', senderId);
    const subscription = observeMessages(senderId).subscribe(messages => {
      console.log('messages from useEffect', messages);
      setMessagesArray(messages.map(message => message.content));
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, [senderId]);

  async function handleSend() {
    await database.write(async () => {
      // Clear existing data
      const messages = await database.get('messages').query().fetch();
      await database.unsafeResetDatabase();

      const chat4 = await database.get<Chat>('chats').create(chat => {
        chat.name = user;
        chat.lastMessage = messagesText;
      });
      await database.get<Message>('messages').create(message => {
        message.chat.set(chat4);
        message.content = messagesText;
        message.senderId = senderId;
      });
    });

    //await sendMessage(senderId, messagesText);
    console.log('Writing to db');
    setMessagesArray(prev => (prev ? [...prev, messagesText] : [messagesText]));
    setMessagesText('');
  }

  async function handleSend2() {
    roomOne.send({
      type: 'broadcast',
      event: 'test',
      payload: {message: 'test message', user},
    });

    console.log('from handleSend2');

    // roomOne
    //   .on('broadcast', {event: 'test'}, data => {
    //     console.log('message received', data);
    //   })
    //   .subscribe(status => {
    //     if (status === 'SUBSCRIBED') {
    //       roomOne.send({
    //         type: 'broadcast',
    //         event: 'test',
    //         payload: {message: 'received', user},
    //       });
    //     }
    //   });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user}</Text>

      {messagesArray
        ?.slice()
        .reverse()
        .map((message: string, index: number) => (
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText} key={index}>
                {message}
              </Text>
            </View>
          </View>
        ))}

      <Input variant="rounded" style={{height: 46}}>
        <InputField
          placeholder="Send a Message..."
          value={messagesText}
          onChangeText={setMessagesText}
        />
        <InputSlot
          onPress={handleSend}
          style={{
            marginRight: 10,
            borderRadius: 80,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <InputIcon
            as={SendHorizontal}
            style={{marginRight: 8, width: 38, height: 38}}
            size="xl"
          />
        </InputSlot>
      </Input>
      <Button onPressIn={handleSend2}>Test Message</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3C36',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Adjust as needed
  },
  title: {
    fontSize: 42,
    color: '#D6E500',
    fontFamily: 'Geist-Regular',
    fontWeight: 'bold',
  },
  bubbleWrapper: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#D6E500',
    borderTopRightRadius: 0,
  },
  bubbleText: {
    fontSize: 16,
    color: '#000',
  },
});

export default MessagingScreen;
