import {StyleSheet, Text, View} from 'react-native';

export function GroupsTab() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Groups</Text>
        </View>
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
  },
});
