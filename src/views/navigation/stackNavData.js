import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native'
import TabNavigation from './tabNavigation'
import { color } from '../../constants/color'

// const headerLeftComponent = (props) => {
//   return (
//     <TouchableOpacity
//       onPress={props.onPress}
//       style={{
//         paddingVertical: 12,
//         alignItems: 'flex-start'
//       }}
//     >
//       <Image
//         source={require('../../../assets/arrow_back.png')}
//         resizeMode="contain"
//         style={{
//           tintColor: color.PRIMARY,
//           height: 20,
//         }}
//       />
//     </TouchableOpacity>
//   )
// }
const StackNavigationData = [
  {
    headerLeft: null,
    name: 'main',
    component: TabNavigation,
  },
]

export default StackNavigationData;
