import {RouteProp, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './ChatsTab';
import {Input, InputField} from 'components/ui/input';
import {useState} from 'react';
import {Button, ButtonText} from 'components/ui/button';
import { sendMessage } from 'services/messageService';
import Message from 'services/models/Message';
import { database } from 'services/database';
import Chat from 'services/models/Chat';

type UserScreenRouteProp = RouteProp<RootStackParamList, 'User'>;

function MessagingScreen() {
  const [messagesText, setMessagesText] = useState('');
  const [messagesArray, setMessagesArray] = useState<string[]>([]);
  const route = useRoute<UserScreenRouteProp>();
  const {user} = route.params;

  async function handleSend() {
    await database.write(async () => {
      // Clear existing data
      const messages = await database.get('messages').query().fetch();
      await database.unsafeResetDatabase();

        const chat4 = await database.get<Chat>('chats').create(chat => {
          chat.name = 'Rowdy Ranga';
          chat.lastMessage = messagesText;
        });
          await database.get<Message>('messages').create(message => {
          message.chat.set(chat4);
          message.content = messagesText;
          message.senderId = 'user1';
        });
      })
    //sendMessage('1' , messagesText)
    console.log("Writing to db");
    setMessagesArray(prev => (prev ? [...prev, messagesText] : [messagesText]));
    setMessagesText('');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user}</Text>

      {messagesArray?.map((message: string, index: number) => (
        <View style={styles.bubbleWrapper}>
          <View style={styles.bubble}>
            <Text style={styles.bubbleText} key={index}>
              {message}
            </Text>
          </View>
        </View>
      ))}

      <Input>
        <InputField
          placeholder="Send a Message..."
          value={messagesText}
          onChangeText={setMessagesText}
        />
      </Input>
      <Button onPress={handleSend}>
        <ButtonText>Send</ButtonText>
      </Button>
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
