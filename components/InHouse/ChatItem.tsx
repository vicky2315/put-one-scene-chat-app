import {Pressable, StyleSheet, Text, View} from 'react-native';

export type ChatDisplayProps = {
  id: number;
  senderId: string;
  name: string;
  lastMessage: string;
  onPress?: () => void;
};
export const ChatItem = (chat: ChatDisplayProps) => {
  const handlePress = () => {
    //console.log('chat', chat);
    if (chat.onPress) {
      chat.onPress();
    } else {
      console.log('Chat tapped:', chat.id);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        key={chat.id}
        style={styles.chatItem}
        onPress={handlePress}
        android_ripple={{color: '#D6E50022'}}>
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.chatMessage}>{chat.lastMessage}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden', // This is key to clipping the ripple to the border
    marginBottom: 12,
  },
  chatItem: {
    backgroundColor: '#4A4B45',
    padding: 16,
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
