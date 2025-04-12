/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatsTab} from './ChatsTab';
import {GroupsTab} from './GroupsTab';
import {Icon} from '@/components/ui/icon';
import {
  MessageSquare,
  MessageSquareText,
  Users,
  UsersRound,
  EllipsisVertical,
} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native';
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import {useState} from 'react';
import {handleLogout} from '@/services/supabaseServices';

export function LandingScreen() {
  const Tab = createBottomTabNavigator();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);

  return (
    <>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          style={{backgroundColor: '#171815', borderWidth: 0}}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Profile</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Settings</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Scan QR</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleLogout}>
            <ActionsheetItemText style={{color: 'red'}}>
              Log Out
            </ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled onPress={handleClose}>
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            backgroundColor: '#3B3C36',
            borderTopWidth: 0,
            elevation: 0.5,
          },
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Chats') {
              iconName = focused ? MessageSquareText : MessageSquare;
            } else if (route.name === 'Groups') {
              iconName = focused ? UsersRound : Users;
            }

            // You can return any component that you like here!
            const mappedSize = 'lg'; // Set a larger size explicitly
            return <Icon as={iconName} size={mappedSize} color={color} />;
          },
          tabBarActiveTintColor: '#D6E500',
          tabBarInactiveTintColor: 'gray',
          tabBarInactiveBackgroundColor: '#3B3C36',
          tabBarActiveBackgroundColor: '#4A4B45',
          tabBarIconStyle: {transform: [{scale: 1.6}]},
          headerStyle: {
            backgroundColor: '#3B3C36', // '#2B2C28' for darker header background
          },
          headerTitleStyle: {
            color: '#D6E500',
            fontSize: 38,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
              <Icon
                as={EllipsisVertical}
                size="xl"
                color="#D6E500"
                style={{marginRight: 16}}
              />
            </TouchableOpacity>
          ),
        })}>
        <Tab.Screen name="Chats" component={ChatsTab} />
        <Tab.Screen name="Groups" component={GroupsTab} />
      </Tab.Navigator>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2B2C28',
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 20,
//     backgroundColor: '#2B2C28',
//     alignItems: 'center',
//   },
//   headerText: {
//     color: '#D6E500',
//     fontSize: 24,
//     fontWeight: '700',
//   },
// });
