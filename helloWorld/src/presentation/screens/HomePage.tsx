import React from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import { styles } from '../styles';
import Home from '../../domain/Home';

export default class HomePage extends React.Component<{
  componentId: any,
},{
  name: string,
}> 
{
  private home: Home;

  constructor(props: any){
    super(props);
    this.state = {
      name: "",
    }
    this.home = new Home();
    this.home.getUserName().then((name) => this.setState({name : name || ""}));
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Bem Vindo'
        },
        drawBehind: true,
      }
    };
  };

  render() {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.text}>Bem Vindo {this.state.name}</Text>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={ () => this.home.goUserList(this.props.componentId)}
            style={styles.button}>
            <Text style={styles.textButton}>Lista de Usuários</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={ () => this.home.goUserCreate(this.props.componentId)}
            style={styles.button}>
            <Text style={styles.textButton}>Criar Usuário</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight
            onPress={() => this.home.logout() }
            style={[styles.button, {backgroundColor:'#DDDDDD'}]}>
            <Text style={[styles.textButton, {color: '#222222'}]}>Logout</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  };
}