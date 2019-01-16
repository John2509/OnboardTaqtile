import React from 'react'
import {
  View,
  Text,
  Alert,
  TouchableHighlight
} from 'react-native'

import Navigation from '../../core/navigation';
import { styles } from '../styles';
import { KEYS } from '../../data/config';
import { LocalData } from '../../data/LocalData';

export default class HomePage extends React.Component<{
  componentId: any,
},{
  name: string,
}> 
{
  private localData: LocalData;

  constructor(props: any){
    super(props);
    this.state = {
      name: "",
    }
    this.localData = new LocalData();
    this.localData.get(KEYS.USER_KEY).then((name) => this.setState({name : name || ""}));
  }

  async logout() {
    try {
      await this.localData.remove(KEYS.USER_KEY);
      await this.localData.remove(KEYS.TOKEN_KEY);
      Navigation.goToAuth();
    } catch (err) {
      Alert.alert('Erro ao logout...: ', err);
      Navigation.goToAuth();
    }
  }

  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.text}>Bem Vindo {this.state.name}</Text>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={ () => Navigation.pushScreen(this.props.componentId, 'UserList')}
            style={styles.button}>
            <Text style={styles.textButton}>Lista de Usuários</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={() => this.logout() }
            style={styles.button}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Bem Vindo'
        },
        drawBehind: true,
      }
    };
  }
}