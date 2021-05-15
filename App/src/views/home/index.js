import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'
import { HOME } from '../../constants/language'
import { normalize } from '../../constants/size'
import { color } from '../../constants/color'

const Home = ({ navigation }) => {
  const user = useSelector(state => state.user)
  const [systemStatus, setSystemStatus] = useState(1)
  const status = [HOME.CHECKING, HOME.ON, HOME.OFF]
  const statusText = [HOME.CHECKINGTEXT, HOME.ONTEXT, HOME.OFFTEXT]
  const statusImg = [
    require('../../../assets/home/checking.png'),
    require('../../../assets/home/on.png'),
    require('../../../assets/home/off.png')
  ]
  const statusColor = [color.GRAY, color.ON, color.OFF]

  useEffect(() => {
    console.log('fetch current system status')
  }, [])
  const updateStatusHandler = () => {
    console.log('update current system status')
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
      width: normalize(30),
      height: normalize(30),
      borderRadius: 100
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
        >
          <Image
            style={styles.avatar}
            source={require('../../../assets/home/avatar.jpg')}
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
