import {RouteProp, useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './ChatsTab';

type UserScreenRouteProp = RouteProp<RootStackParamList, 'User'>;

function MessagingScreen() {
  const route = useRoute<UserScreenRouteProp>();
  const {user} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user}</Text>
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
});

export default MessagingScreen;
