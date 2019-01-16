import React from 'react'
import {
  View,
  Text
} from 'react-native'

import { styles } from '../styles'
import Initializing from '../../domain/Initializing';

export default class InitializingPage extends React.Component {

  private initializing: Initializing;

  constructor(props: any){
    super(props);
    this.initializing = new Initializing();
  }

  async componentDidMount() {
    this.initializing.load();
  }

  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.textWelcome}>Loading...</Text>
      </View>
    )
  }
}