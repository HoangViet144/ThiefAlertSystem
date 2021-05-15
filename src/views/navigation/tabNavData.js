import React from 'react'
import Home from '../home/index'
import * as language from '../../constants/language'
const iconFriend = require('../../../assets/tabbar/friends.png')

const tabNavigationData = [
  {
    name: language.BOTTOM_NAV_BAR_FRIEND,
    component: Home,
    icon: iconFriend,
    chosenIcon: iconFriend
  },
];

export default tabNavigationData;