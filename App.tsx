/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-url-polyfill/auto';

import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import './global.css';

//import {Button} from '@react-navigation/elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {SignUpScreen} from './screens/SignUpScreen';
import {GenerateQR} from './screens/GenerateQR';
import {LogInScreen} from './screens/LogInScreen';
import supabase from './services/supabaseClient';
import {LandingScreen} from './screens/LandingScreen';
import SpinnerScreen from './components/InHouse/SpinnerScreen';
import MessagingScreen from 'screens/MessagingScreen';
import {database} from './services/database';
import {DatabaseProvider} from '@nozbe/watermelondb/react';
import Chat from 'services/models/Chat';
import Message from 'services/models/Message';
import ProfileScreen from 'screens/ProfileScreen';
import ContactsScreen from 'screens/ContactsScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: '#D7EC39',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: '#D7EC39',
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (__DEV__) {
      seedMockData();
    }
    setLoading(true);
    // Get session on load
    supabase.auth.getSession().then(({data: {session}}) => setSession(session));

    // Listen for session changes
    const {data: listener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  return (
    <>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerStyle: {backgroundColor: 'white'},
        }}>
        {session ? (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="User"
              component={MessagingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Contacts"
              component={ContactsScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            {loading ? (
              <Stack.Screen
                name="Spinner"
                options={{headerShown: false}}
                component={SpinnerScreen}
              />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Sign-Up" component={SignUpScreen} />
                <Stack.Screen name="GenerateQR" component={GenerateQR} />
                <Stack.Screen name="Log In" component={LogInScreen} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export async function seedMockData() {
  await database.write(async () => {
    // Clear existing data
    const messages = await database.get('messages').query().fetch();
    console.log(
      'All messages:',
      messages.map(m => m._raw),
    );
    //await database.unsafeResetDatabase();

    // Create mock chats
    const chat1 = await database.get<Chat>('chats').create(chat => {
      chat.name = 'Rowdy Ranga';
      chat.lastMessage = 'Baro ache loude';
    });

    const chat2 = await database.get<Chat>('chats').create(chat => {
      chat.name = 'Long Lokesh';
      chat.lastMessage = 'Dum hakana ba';
    });

    // Add sample messages
    await database.get<Message>('messages').create(message => {
      message.chat.set(chat1);
      message.content = 'Baro ache loude';
      message.senderId = 'user1';
    });

    await database.get<Message>('messages').create(message => {
      message.chat.set(chat2);
      message.content = 'Dum hakana ba';
      message.senderId = 'user2';
    });
  });
}

function App(): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  const roomOne = supabase.channel('room-one');
  roomOne
    .on('broadcast', {event: 'test'}, data => {
      console.log('message received', data);
    })
    .subscribe(status => {
      if (status === 'SUBSCRIBED') {
        roomOne.send({
          type: 'broadcast',
          event: 'test',
          payload: {message: 'received', user},
        });
      }
    });

  // Check all messages

  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: '#D7EC39',
  };

  const safePadding = '5%';

  return (
    <DatabaseProvider database={database}>
      <GluestackUIProvider mode="light">
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </DatabaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerFont: {
    color: 'black',
    fontSize: 40,
    fontWeight: 500,
    fontFamily: 'Geist-Regular',
  },
  testTwo: {
    color: 'white',
    fontSize: 40,
  },
  testThree: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'SpaceMono-Regular',
  },
});

export default App;
