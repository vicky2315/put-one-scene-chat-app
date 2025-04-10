import {Button, ButtonText} from '@/components/ui/button';
import supabase from '@/services/supabaseClient';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

export function ChatsScreen() {
  const chats = [
    { id: 1, name: 'Rowdy Ranga', lastMessage: 'Baro ache loude' },
    { id: 2, name: 'Long Lokesh', lastMessage: 'Dum hakana ba' },
    { id: 3, name: 'Mass Mahesh', lastMessage: 'D-Boss ki jai' },
  ];
  async function handleLogout(): Promise<void> {
    const {error} = await supabase.auth.signOut();


    if (error) {
      Alert.alert('Error logging out', error.message);
    }
  }

  return (  
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      <ScrollView 
        style={styles.chatList}
        contentContainerStyle={styles.chatListContent}
      >
        {chats.map(chat => (
          <View key={chat.id} style={styles.chatItem}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatMessage}>{chat.lastMessage}</Text>
          </View>
        ))}
        </ScrollView>

        <Button onPress={handleLogout} action="negative">
          <ButtonText>Log Out</ButtonText>
        </Button>
      </View>
    </>
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
  }
});
