import React from 'react'
import {
  View,
  Text,
  AsyncStorage,
  Alert,
  TouchableHighlight
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import { goToAuth } from '../scr/navigation';
import { styles } from '../scr/styles';
import { USER_KEY, TOKEN_KEY } from '../scr/config';

export default class HomePage extends React.Component<{
  componentId: any,
},{
  name: string,
}> 
{
  constructor(props: any){
    super(props);
    this.state = {
      name: "",
    }
    AsyncStorage.getItem(USER_KEY).then((name) => this.setState({name : name || ""}));
  }

  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.text}>Bem Vindo {this.state.name}</Text>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={ () => Navigation.push(this.props.componentId, {
              component: {
                name: 'UserList',
              }
            })}
            style={styles.button}>
            <Text style={styles.textButton}>Lista de Usuários</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={ this.logout }
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
  
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(TOKEN_KEY);
      goToAuth();
    } catch (err) {
      Alert.alert('Erro ao logout...: ', err);
      goToAuth();
    }
  }
}