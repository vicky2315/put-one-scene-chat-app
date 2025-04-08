import {Button, ButtonText} from '@/components/ui/button';
import supabase from '@/services/supabaseClient';
import {Alert, StyleSheet, Text, View} from 'react-native';

export function ChatsScreen() {
  async function handleLogout(): Promise<void> {
    const {error} = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error logging out', error.message);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Chats</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 42,
    color: '#D6E500',
    fontFamily: 'Geist-Regular',
    fontWeight: 'bold',
  },
});
