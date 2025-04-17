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
import {useEffect, useState, type PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HomeScreen} from './screens/HomeScreen';
import {SignUpScreen} from './screens/SignUpScreen';
import {GenerateQR} from './screens/GenerateQR';
import {LogInScreen} from './screens/LogInScreen';
import supabase from './services/supabaseClient';
import {LandingScreen} from './screens/LandingScreen';
import SpinnerScreen from './components/InHouse/SpinnerScreen';
import MessagingScreen from 'screens/MessagingScreen';

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

function App(): React.JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: '#D7EC39',
  };

  const safePadding = '5%';

  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GluestackUIProvider>
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
