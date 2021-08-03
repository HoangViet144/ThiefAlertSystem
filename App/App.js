import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { store } from "./src/store/store"
import AppView from "./src/views/navigation/index"
import RNBootSplash from 'react-native-bootsplash'

export default App = () => {
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
