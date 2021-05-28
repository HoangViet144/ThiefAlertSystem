import React, { useEffect } from 'react'
import { StyleSheet, Platform, StatusBar, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { store } from "./src/store/store"
import AppView from "./src/views/navigation/index"
import RNBootSplash from 'react-native-bootsplash'
import messaging from '@react-native-firebase/messaging'

export default App = () => {
  useEffect(() => {
    console.log("create fcm listener")
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
        <StatusBar barStyle="default" />
        <AppView />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
});
