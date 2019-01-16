import React from 'react'
import {
  View,
  Text
} from 'react-native'

import Navigation from '../../core/navigation'
import { styles } from '../styles'
import { KEYS } from '../../data/config'
import { LocalData } from '../../data/LocalData';

interface Props {}
export default class Initializing extends React.Component {

  private localData: LocalData;

  constructor(props: any){
    super(props);
    this.localData = new LocalData();
  }

  async componentDidMount() {
    try {
      const user = await this.localData.get(KEYS.USER_KEY);
      if (user) {
        Navigation.goHome();
      } else {
        Navigation.goToAuth();
      }
    } catch (err) {
      Navigation.goToAuth();
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