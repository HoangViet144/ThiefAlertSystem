import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const Home = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Đây là home</Text>
    </View>
  )
}
export default Home
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  }
})