/* eslint-disable react-native/no-inline-styles */
//import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SvgLogo from '../assets/images/test.svg';
import {Button, ButtonText} from '@/components/ui/button';
import {
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';
import React from 'react';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D7EC39',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
        }}>
        <Text style={styles.headerFont}>Put1Scene</Text>
        <SvgLogo width={200} height={200} />
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <Button onPress={() => navigation.navigate('Log In')}>
            <ButtonText>Log In</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate('Sign-Up')}>
            <ButtonText>Sign Up</ButtonText>
          </Button>
        </View>
      </View>
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

// export function Example() {
//   const toast = useToast();
//   const [toastId, setToastId] = React.useState('');
//   const handleToast = () => {
//     if (!toast.isActive(toastId)) {
//       showNewToast();
//     }
//   };
//   const showNewToast = () => {
//     const newId = Math.random();
//     setToastId(newId + '');
//     toast.show({
//       id: newId + '',
//       placement: 'top',
//       duration: 3000,
//       render: ({id}) => {
//         const uniqueToastId = 'toast-' + id;
//         return (
//           <Toast nativeID={uniqueToastId} action="muted" variant="solid">
//             <ToastTitle>Hello!</ToastTitle>
//             <ToastDescription>
//               This is a customized toast message.
//             </ToastDescription>
//           </Toast>
//         );
//       },
//     });
//   };
//   return (
//     <Button onPress={handleToast}>
//       <ButtonText>Press Me</ButtonText>
//     </Button>
//   );
// }
