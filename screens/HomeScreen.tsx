//import {Button} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D7EC39',
      }}>
      <Text style={styles.headerFont}>Put1Scene</Text>
      <Button onPress={() => navigation.navigate('Sign-Up')}>
        <ButtonText>Sign Up</ButtonText>
      </Button>
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
