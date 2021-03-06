import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native'
import {
  Button,
} from 'react-native-elements'
import { useSelector } from 'react-redux'
import { color } from '../../constants/color'
import { SETTING } from '../../constants/language'
import { normalize } from '../../constants/size'
import DateTimePicker from '@react-native-community/datetimepicker'
import { BASE_URL } from '../../constants/config'
import moment from 'moment'

const Setting = ({ navigation }) => {
  const user = useSelector(state => state.user.user)
  const [userInfo, setUserInfo] = useState({ username: '' })
  const [openTimeForm, setOpenTimeForm] = useState(false)
  const [stateSetTime, setStateSetTime] = useState(0)
  const [currentSettingTime, setCurrentSettingTime] = useState({
    start: new Date().getTime(),
    end: new Date().getTime()
  })
  const buttonData = [
    {
      title: SETTING.NOTI,
      icon: require('../../../assets/setting/noti.png'),
      style: null,
      onPress: () => navigation.navigate('comingSoon')
    },
    {
      title: SETTING.TIMING,
      icon: require('../../../assets/setting/timing.png'),
      style: { marginBottom: normalize(40) },
      onPress: () => setOpenTimeForm(true)
    },
    {
      title: SETTING.TERM,
      icon: require('../../../assets/setting/term.png'),
      style: null,
      onPress: () => navigation.navigate('comingSoon')
    },
    {
      title: SETTING.PRIVACY,
      icon: require('../../../assets/setting/privacy.png'),
      style: null,
      onPress: () => navigation.navigate('comingSoon')
    },
    {
      title: SETTING.HELP,
      icon: require('../../../assets/setting/help.png'),
      style: null,
      onPress: () => turnOnOffAlert("off")
    },
    {
      title: SETTING.ABOUT,
      icon: require('../../../assets/setting/about.png'),
      style: null,
      onPress: () => turnOnOffAlert("on")
    }
  ]
  const turnOnOffAlert = async (status) => {
    const url = BASE_URL + (status === "on" ? "/api/system/on-alert" : "/api/system/off-alert-manually")
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': user.token
      },
    })
    console.log("turn on/off alert" + response.status)
  }
  const [tmp, setTemp] = useState()
  const timingStartHandler = (e, selectedTime) => {
    setOpenTimeForm(false)
    if (selectedTime) {
      setTemp(selectedTime.getTime())
      setStateSetTime(1)
    }
  }
  const timingEndHandler = async (e, selectedTime) => {
    setStateSetTime(0)
    if (selectedTime) {
      setCurrentSettingTime({ start: tmp, end: selectedTime.getTime() })
      Alert.alert(
        "Update timing for system",
        "Start: " + moment(tmp).format('hh:mm:ss') + "\nEnd: " + moment(selectedTime).format('hh:mm:ss')
      )
      try {
        const response = await fetch(BASE_URL + "/api/system/set-timer", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': user.token
          },
          body: JSON.stringify({
            start: moment(tmp).format('hh:mm:ss'),
            end: moment(selectedTime).format('hh:mm:ss')
          })
        })
        console.log("set timer: " + response.status)
      } catch (err) {
        console.log(err)
      }
    }
  }
  useEffect(() => {
    if (openTimeForm)
      ToastAndroid.showWithGravityAndOffset(
        "Please choose the start time of the system",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
  }, [openTimeForm])
  useEffect(() => {
    if (stateSetTime === 1)
      ToastAndroid.showWithGravityAndOffset(
        "Please choose the end time of the system",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        50
      );
  }, [stateSetTime])
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
        <Text style={styles.header}>{SETTING.TITLE}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
      >
        <View style={styles.userContainer}>
          <View style={styles.user}>
            <Image
              source={require('../../../assets/home/avatar.jpg')}
              style={styles.avatar}
            />
            <Text style={styles.username}>{userInfo.username}</Text>
          </View>
          <View style={styles.nextContainer}>

            <Image
              source={require('../../../assets/arrow_right.png')}
              style={styles.nextBtn}
            />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.btnList}>
          {buttonData.map((item, ind) =>
            <Button
              key={ind}
              icon={
                <Image
                  style={styles.iconBtn}
                  source={item.icon}
                />
              }
              title={item.title}
              type="clear"
              containerStyle={{ ...styles.containerBtn, ...item.style }}
              titleStyle={styles.titleBtn}
              buttonStyle={styles.styleBtn}
              onPress={item.onPress}
            />
          )}
          {openTimeForm && <DateTimePicker
            value={new Date(currentSettingTime.start)}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={timingStartHandler}
          />}
          {stateSetTime === 1 && <DateTimePicker
            value={new Date(currentSettingTime.end)}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={timingEndHandler}
          />}
        </View>
      </ScrollView>
    </View>
  )
}
export default Setting
const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: color.WHITE
  },
  headerContainer: {
    marginTop: 25,
    marginLeft: 60
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  userContainer: {
    marginTop: normalize(30),
    flexDirection: 'row',
    marginHorizontal: 60,
    justifyContent: 'space-between'
  },
  avatar: {
    borderRadius: 40,
    width: normalize(60),
    height: normalize(60)
  },
  username: {
    marginLeft: normalize(20),
    fontSize: 20,
    fontWeight: 'bold'
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nextBtn: {
    width: normalize(12),
    height: normalize(19)
  },
  nextContainer: {
    justifyContent: 'center'
  },
  btnList: {
    marginTop: 61,
    marginHorizontal: 60,
    alignItems: 'flex-start',
  },
  iconBtn: {
    width: 35,
    height: 35,
    marginRight: 20
  },
  styleBtn: {
    paddingLeft: 0,
    width: '100%',
    justifyContent: 'flex-start',
  },
  titleBtn: {
    fontSize: 20,
    color: color.BLACK
  },
  containerBtn: {
    width: '100%',
    marginBottom: normalize(10)
  }
})