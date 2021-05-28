import React from 'react';
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import stackNavData from './stackNavData';
import { color } from '../../constants/color'
import Login from '../auth/login'

const Stack = createStackNavigator();
const styles = StyleSheet.create({
  headerLeftContainerStyle: {
    marginTop: 50,
    padding: 0
  }
})

export default NavigatorView = (props) => {
  const { user } = useSelector(state => state.user)
  if (!user.isAuthenticated) return <Login />
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true
      }}
    >
      {stackNavData.map((item, idx) => (
        <Stack.Screen
          key={`stackItem-${idx}`}
          name={item.name}
          component={item.component}
          headerTransparent
          options={{
            headerLeft: item.headerLeft,
            headerLeftContainerStyle: styles.headerLeftContainerStyle,
            headerTitle: '',
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
