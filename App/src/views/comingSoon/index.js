import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { color } from '../../constants/color'

const ComingSoon = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Coming soon !!!</Text>
    </View>
  )
}
export default ComingSoon
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
})