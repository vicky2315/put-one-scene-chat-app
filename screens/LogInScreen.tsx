/* eslint-disable react-native/no-inline-styles */
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import {AlertCircleIcon, EyeIcon, EyeOffIcon} from '@/components/ui/icon';
import {Input, InputField, InputIcon, InputSlot} from '@/components/ui/input';
import {logInUser} from '@/services/supabaseServices';
import React, {useState} from 'react';
//import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';

export function LogInScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({message: '', isInvalid: false});
  const togglePasswordVisibility = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  async function handleLogIn(): Promise<void> {
    setLoading(true);
    setError({message: '', isInvalid: false});
    const data = await logInUser(email, password);

    if (data instanceof Error) {
      console.log(data.message);
      setError({message: data.message, isInvalid: true});
    }

    setLoading(false);
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
        <FormControl isInvalid={error.isInvalid}>
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
              onPress={togglePasswordVisibility}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{error.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button onPress={handleLogIn} style={{marginTop: 10}}>
          {loading ? (
            <>
              <ButtonSpinner color={'white'} />
              <ButtonText className="font-medium text-sm ml-2">
                Please wait...
              </ButtonText>
            </>
          ) : (
            <ButtonText>Log In</ButtonText>
          )}
        </Button>
      </View>
    </View>
  );
}
