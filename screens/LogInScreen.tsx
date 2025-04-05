/* eslint-disable react-native/no-inline-styles */
import {Button, ButtonText} from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {EyeIcon, EyeOffIcon} from '@/components/ui/icon';
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';
import React, {useState} from 'react';
//import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';

export function LogInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  function handleLogIn(): void {
    console.log(email, password);
  }

  //const navigation = useNavigation();
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
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '500',
            fontFamily: 'Geist-Regular',
            color: 'black',
            marginBottom: 12,
          }}>
          Log In
        </Text>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField
              size="lg"
              id="email"
              type="text"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </Input>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField
              size="lg"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChangeText={setPassword}
            />
            <InputSlot
              className="pr-3"
              style={{marginRight: 8}}
              onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlHelper>
            <FormControlHelperText />
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon />
            <FormControlErrorText />
          </FormControlError>
        </FormControl>
        <Button onPress={handleLogIn}>
          <ButtonText>Log In</ButtonText>
        </Button>
      </View>
    </View>
  );
}
