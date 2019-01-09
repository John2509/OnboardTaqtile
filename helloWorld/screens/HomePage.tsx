import React from 'react'
import {
  View,
  Text,
  Button,
  AsyncStorage,
  Alert,
  TouchableHighlight
} from 'react-native'

import { goToAuth } from '../scr/navigation';
import { Navigation } from 'react-native-navigation';
import { styles } from '../scr/styles';
import { USER_KEY, TOKEN_KEY } from '../scr/config';

export default class HomePage extends React.Component<{
  componentId: any,
}> 
{
  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.text}>Bem Vindo</Text>
        <TouchableHighlight
          onPress={this.logout}
          style={styles.button}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Bem Vindo'
        },
      }
    };
  }
  
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      goToAuth();
    } catch (err) {
      Alert.alert('Erro ao logout...: ', err);
    }
  }
}