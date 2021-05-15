import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { color } from '../../constants/color'
import { LOGIN } from '../../constants/language'
import { normalize } from '../../constants/size'
import Input from '../../component/floatingLabelInput'
import {
  Button
} from 'react-native-elements'

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const loginHanlder = () => {
    console.log("create post request/...")
    setIsLoading(true)
  }
  return (
    <View style={styles.screen}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{LOGIN.WELCOME}</Text>
        </View>
        <View style={styles.form}>
          <Input
            labelStyle={styles.labelStyle}
            label={LOGIN.USERNAME}
            placeholder={LOGIN.USERNAME}
            value={user.username}
            onChangeText={value => setUser(user => ({ ...user, username: value }))}
          />
          <Input
            labelStyle={styles.labelStyle}
            label={LOGIN.PASSWORD}
            placeholder={LOGIN.PASSWORD}
            value={user.password}
            onChangeText={value => setUser(user => ({ ...user, password: value }))}
          />
        </View>
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgot}>{LOGIN.FORGOT}</Text>
        </TouchableOpacity>
        <Button
          title={LOGIN.LOGIN}
          type="solid"
          buttonStyle={styles.loginBtn}
          titleStyle={styles.loginTitleBtn}
          disabled={user.email === '' || user.password === ''}
          onPress={loginHanlder}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.signup1}>{LOGIN.SIGNUP1}</Text>
        <TouchableOpacity>
          <Text style={styles.signup2}>{LOGIN.SIGNUP2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Login
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE
  },
  headerContainer: {
    marginTop: normalize(75),
    marginLeft: normalize(48)
  },
  header: {
    fontSize: normalize(34)
  },
  labelStyle: {
    fontSize: normalize(12),
    color: color.GRAY
  },
  form: {
    marginHorizontal: normalize(48),
    marginTop: normalize(30)
  },
  forgotContainer: {
    marginHorizontal: normalize(48),
    marginVertical: normalize(30),
    alignItems: 'flex-end'
  },
  forgot: {
    color: color.SECONDARY,
    fontSize: 17
  },
  loginBtn: {
    marginHorizontal: normalize(48),
    backgroundColor: color.PRIMARY,
    borderRadius: 10
  },
  loginTitleBtn: {
    fontSize: 15
  },
  contentContainer: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(30)
  },
  signup1: {
    fontSize: 15
  },
  signup2: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})