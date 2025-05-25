/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-quotes */
import {ChatDisplayProps, ChatItem} from '../components/InHouse/ChatItem';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {observeChats, observeMessages} from '../services/messageService';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Fab, FabIcon, FabLabel} from 'components/ui/fab';
import {Box} from '@/components/ui/box';
import {AddIcon} from 'components/ui/icon';

export type RootStackParamList = {
  Landing: undefined;
  User: {user: string; senderId: string}; // 👈 define expected params here
  Profile: undefined;
  Contacts: undefined;
};

export function ChatsTab() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const chats = [
    {
      id: 1,
      senderId: 'user1',
      name: 'Rowdy Ranga',
      lastMessage: 'Baro ache loude',
    },
    {
      id: 2,
      senderId: 'user2',
      name: 'Long Lokesh',
      lastMessage: 'Dum hakana ba',
    },
    {
      id: 3,
      senderId: 'user3',
      name: 'Mass Mahesh',
      lastMessage: 'D-Boss ki jai',
    },
  ];

  const handleContactsNav = () => navigation.navigate('Contacts');

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}>
          {chats.map((chat: ChatDisplayProps) => (
            <ChatItem
              id={chat.id}
              name={chat.name}
              lastMessage={chat.lastMessage}
              key={chat.id}
              onPress={() =>
                navigation.navigate('User', {
                  user: chat.name,
                  senderId: chat.senderId,
                })
              }
              senderId={chat.senderId}
            />
          ))}
        </ScrollView>
      </View>
      <Box className="h-[360px] w-80 bg-background-neon rounded-md">
        <Pressable onPress={handleContactsNav}>
          <Fab
            size="lg"
            placement="bottom right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}>
            <FabIcon as={AddIcon} />
            <FabLabel>New Chat</FabLabel>
          </Fab>
        </Pressable>
      </Box>
    </>
  );
}

const EnhancedChatsTab = withObservables([], () => ({
  chats: observeChats(), // Now using real data from WatermelonDB
}))(ChatsTab);

export default EnhancedChatsTab;

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
  chatListContent: {
    paddingBottom: 20, // Ensures space at bottom
  },
  chatList: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  chatItem: {
    backgroundColor: '#4A4B45',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  chatName: {
    color: '#D6E500',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
});
