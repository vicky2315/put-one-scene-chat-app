/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button } from '@react-navigation/elements';
import { createStaticNavigation, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
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

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor : '#D7EC39' }}>

    <Text style = {styles.headerFont}>Put1Scene</Text>
    <Button onPress={() => navigation.navigate('Details')}>
      Go to Details
    </Button>
  </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : '#D7EC39' }}>
    <Text>Details Screen</Text>
    <Button onPress={() => navigation.goBack()}>Go back</Button>
  </View>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    headerStyle: { backgroundColor: 'white' },
  }}
>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: '#D7EC39'
  };

  const safePadding = '5%';

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
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
    fontWeight : 500,
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
