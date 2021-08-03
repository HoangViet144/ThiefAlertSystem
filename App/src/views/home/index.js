import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import { HOME } from '../../constants/language'
import { normalize } from '../../constants/size'
import { color } from '../../constants/color'
import { BASE_URL } from '../../constants/config'
import {
  Tooltip
} from 'react-native-elements'
import messaging from '@react-native-firebase/messaging'

const Home = ({ navigation }) => {
  const user = useSelector(state => state.user.user)
  const [systemStatus, setSystemStatus] = useState(0)
  const status = [HOME.CHECKING, HOME.ON, HOME.OFF]
  const statusText = [HOME.CHECKINGTEXT, HOME.ONTEXT, HOME.OFFTEXT]
  const statusImg = [
    require('../../../assets/home/checking.png'),
    require('../../../assets/home/on.png'),
    require('../../../assets/home/off.png')
  ]
  const statusColor = [color.GRAY, color.ON, color.OFF]
  useEffect(() => {
    console.log("create fcm listener")
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage)
      console.log(remoteMessage["data"])
      console.log(remoteMessage["data"]["message"])
      Alert.alert(
        'A new message has arrived!',
        remoteMessage["data"]["message"],
        [
          {
            text: "Turn off alert",
            onPress: turnOffAlert
          }
        ]
      );
    });
    return unsubscribe;
  }, [])
  const turnOffAlert = async () => {
    try {
      const response = await fetch(BASE_URL + "/api/system/off-alert", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': user.token
        },
      })
      console.log("turn off alert: " + response.status)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log('fetch current system status')
    const fetchSysStatus = async () => {
      const raw = await fetch(BASE_URL + '/api/system/status', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': user.token
        },
      })
      const response = await raw.json()
      console.log("current system status " + response.status)
      if (response.status === "on") setSystemStatus(1)
      else setSystemStatus(2)
    }
    fetchSysStatus()
  }, [])
  const updateStatusHandler = async () => {
    const url = BASE_URL + (systemStatus === 1 ? "/api/system/off-system" : "/api/system/on-system")
    console.log('update current system status', url)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': user.token
        },
      })
      if (response.status === 200) {
        setSystemStatus(cur => 3 - cur)
      } else {
        setSystemStatus(0)
        Alert.alert(
          "Something wrong, please try again"
        );
      }
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }
  }

  const styles = StyleSheet.create({
    screen: {
      width: "100%",
      height: "100%",
      backgroundColor: color.WHITE
    },
    statusImg: {
      width: normalize(175),
      height: normalize(175),
    },
    body: {
      alignItems: 'center',
      marginTop: normalize(75)
    },
    status: {
      flexDirection: 'row',
      marginTop: normalize(30)
    },
    sysText: {
      fontSize: 35,
      color: color.BLACK
    },
    statusText: {
      fontSize: 35,
      color: statusColor[systemStatus],
      fontWeight: 'bold'
    },
    systemStatus: {
      color: color.GRAY,
      marginTop: 20,
      fontSize: 17
    },
    avatar: {
      width: normalize(60),
      height: normalize(60),
    },
    header: {
      marginTop: normalize(20),
      marginRight: normalize(20),
      alignItems: 'flex-end'
    }
  })
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('setting')}
        //style={{backgroundColor:'red'}}
        >
          <Image
            style={styles.avatar}
            source={require('../../../assets/home/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={updateStatusHandler}
        >
          <Image
            style={styles.statusImg}
            source={statusImg[systemStatus]}
          />
        </TouchableOpacity>
        <View style={styles.status}>
          <Text style={styles.sysText}>{HOME.SYSTEM}</Text>
          <Text style={styles.statusText}>{status[systemStatus]}</Text>
        </View>
        <Text style={styles.systemStatus}> {statusText[systemStatus]}</Text>
      </View>
    </View>
  )
}
export default Home
