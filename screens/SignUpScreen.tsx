import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import SvgLogo from '../assets/images/test.svg';

export function SignUpScreen() {
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
      <Text // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontSize: 30,
          fontWeight: '500',
          fontFamily: 'Geist-Regular',
          color: 'black',
        }}>
        Sign Up
      </Text>
      <SvgLogo width={150} height={150} />
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}
