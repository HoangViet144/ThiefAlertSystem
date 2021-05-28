import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native'
import TabNavigation from './tabNavigation'
import Setting from '../setting/index'
import Profile from '../profile/index'
import Home from '../home/index'
import { color } from '../../constants/color'

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <Image
        source={require('../../../assets/arrow_back.png')}
        resizeMode="contain"
        style={{
          tintColor: color.PRIMARY,
          height: 30,
        }}
      />
    </TouchableOpacity>
  )
}
const StackNavigationData = [
  {
    headerLeft: null,
    name: 'main',
    component: Home,
  },
  {
    headerLeft: headerLeftComponent,
    name: 'setting',
    component: Setting
  },
  {
    headerLeft: headerLeftComponent,
    name: 'profile',
    component: Profile
  }
]

export default StackNavigationData;
