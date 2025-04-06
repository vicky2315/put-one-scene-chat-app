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
import {AlertCircleIcon} from '@/components/ui/icon';
import {Input, InputField} from '@/components/ui/input';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

export function SignUpScreen() {
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
          }}>
          Sign Up
        </Text>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField size="lg" />
          </Input>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField size="lg" />
          </Input>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField size="lg" type="password" />
          </Input>
          <FormControlLabel>
            <FormControlLabelText>Re-enter Password</FormControlLabelText>
          </FormControlLabel>
          <Input style={{marginBottom: 10}}>
            <InputField size="lg" type="password" />
          </Input>
          <FormControlHelper>
            <FormControlHelperText />
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Atleast 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button onPress={() => navigation.navigate('GenerateQR')}>
          <ButtonText>Sign Up/Generate QR</ButtonText>
        </Button>
      </View>
    </View>
  );
}
