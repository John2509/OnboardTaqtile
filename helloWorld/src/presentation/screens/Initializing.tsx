import React from 'react'
import {
  View,
  Text,
  AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from '../../core/navigation'
import { styles } from '../styles'
import { USER_KEY } from '../../data/config'

interface Props {}
export default class Initializing extends React.Component {

  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      if (user) {
        goHome();
      } else {
        goToAuth();
      }
    } catch (err) {
      goToAuth();
    }
  }

  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.textWelcome}>Loading...</Text>
      </View>
    )
  }
}