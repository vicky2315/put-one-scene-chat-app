import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D7EC39',
      }}>
      <Text style={styles.headerFont}>Put1Scene</Text>
      <Button onPress={() => navigation.navigate('Sign-Up')}>Sign Up</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  headerFont: {
    color: 'black',
    fontSize: 40,
    fontWeight: 500,
    fontFamily: 'Geist-Regular',
  },
});
