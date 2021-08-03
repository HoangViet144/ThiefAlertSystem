import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import { useSelector } from 'react-redux'
import Input from '../../component/floatingLabelInput'
import { color } from '../../constants/color'
import { PROFILE } from '../../constants/language'
import { normalize } from '../../constants/size'
import { BASE_URL } from '../../constants/config'

const Profile = (props) => {
  const user = useSelector(state => state.user.user)
  const [userInfo, setUserInfo] = useState({ username: '', email: '', phone: ''})
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      const url = BASE_URL + "/api/users"
      const raw = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': user.token
        },
      })
      const response = await raw.json()
      console.log(response)
      setUserInfo({
        username: response.fullname, 
        email: response.email, 
        phone: response.phone, 
      })
    }
    fetchUserInfo()
  }, [])
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{PROFILE.TITLE}</Text>
      </View>
      <View style={styles.containerOutside}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../../assets/home/avatar.jpg')}
            style={styles.avatar}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.info}>
          <Input
            labelStyle={styles.labelStyle}
            label={PROFILE.USERNAME}
            placeholder={PROFILE.USERNAME}
            value={userInfo.username}
            onChangeText={value => setUserInfo(user => ({ ...user, username: value }))}
          />
          <Input
            labelStyle={styles.labelStyle}
            label={PROFILE.EMAIL}
            placeholder={PROFILE.EMAIL}
            value={userInfo.email}
            onChangeText={value => setUserInfo(user => ({ ...user, email: value }))}
          />
          <Input
            labelStyle={styles.labelStyle}
            label={PROFILE.PHONE}
            placeholder={PROFILE.PHONE}
            value={userInfo.phone}
            onChangeText={value => setUserInfo(user => ({ ...user, phone: value }))}
          />
        </View>
      </ScrollView>
      <Button
        title={PROFILE.SAVE}
        buttonStyle={styles.saveBtnStyle}
        containerStyle={styles.saveBtnContainer}
        titleStyle={styles.saveBtnTitle}
      />
    </View>
  )
}
export default Profile
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE,
  },
  headerContainer: {
    marginTop: 25,
    marginLeft: 60
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  info: {
    marginHorizontal: 45
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    width: normalize(150),
    height: normalize(150),
    borderRadius: 500,
    overflow: 'hidden',
    marginTop: 34,

    backgroundColor: 'red',
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 10,
    backgroundColor: "#0000"
  },
  containerOutside: {
    alignItems: 'center'
  },
  saveBtnStyle: {
    backgroundColor: color.PRIMARY
  },
  saveBtnContainer: {
    marginHorizontal: 55,
    marginBottom: 20
  },
  saveBtnTitle: {
    fontWeight: 'bold',
    fontSize: 20
  }
})