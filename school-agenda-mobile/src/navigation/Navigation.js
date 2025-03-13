import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder for screens until they are created
const PlaceholderScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Coming Soon</Text></View>;

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={PlaceholderScreen} />
    <Stack.Screen name="Register" component={PlaceholderScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={PlaceholderScreen} />
    <Tab.Screen name="Calendar" component={PlaceholderScreen} />
    <Tab.Screen name="Tasks" component={PlaceholderScreen} />
    <Tab.Screen name="Messages" component={PlaceholderScreen} />
  </Tab.Navigator>
);

const Navigation = () => {
  const isAuthenticated = false; // This will come from AuthContext later

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
