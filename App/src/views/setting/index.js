import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native'
import {
  Button,
  Overlay
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
    },
    {
      title: SETTING.PRIVACY,
      icon: require('../../../assets/setting/privacy.png'),
      style: null,
    },
    {
      title: SETTING.HELP,
      icon: require('../../../assets/setting/help.png'),
      style: null,
    },
    {
      title: SETTING.ABOUT,
      icon: require('../../../assets/setting/about.png'),
      style: null,
    }
  ]
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
        "Start: " + moment(tmp).format('hh:mm') + "\nEnd: " + moment(selectedTime).format('hh:mm')
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
            start: new Date(tmp),
            end: new Date(selectedTime)
          })
        })
        console.log(response.status)
      } catch (err) {
        console.log(err)
      }
    }
  }
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
            <Text style={styles.username}>Tran Hoang Viet</Text>
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