import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
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
import DateTimePicker from '@react-native-community/datetimepicker'

const Profile = (props) => {
  const user = useSelector(state => state.user)
  const [userInfo, setUserInfo] = useState({ username: '', email: '', phone: '', gender: '', dob: 0 })
  const [isHide, setIshide] = useState(true)
  const onChangeDOB = (event, selectedDate) => {
    setIshide(true)
    if (selectedDate) {
      setUserInfo(user => ({ ...user, dob: selectedDate.getTime() }))
    }
  }
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
          <Input
            labelStyle={styles.labelStyle}
            label={PROFILE.GENDER}
            placeholder={PROFILE.GENDER}
            value={userInfo.gender}
            onChangeText={value => setUserInfo(user => ({ ...user, gender: value }))}
          />
          <TouchableOpacity
            onPress={() => setIshide(false)}
          >
            <Input
              labelStyle={styles.labelStyle}
              label={PROFILE.DOB}
              placeholder={PROFILE.DOB}
              value={new Date(userInfo.dob).toDateString()}
              disabled
            />
          </TouchableOpacity>
          {!isHide &&
            <DateTimePicker
              value={new Date(userInfo.dob)}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDOB}
            />
          }
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
    marginTop: 15,
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