import React from 'react';
import {
  View, AsyncStorage, Alert, Text, TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';

import { styles } from '../scr/styles';
import { TOKEN_KEY } from '../scr/config';

export default class UserDetails extends React.Component<{
  userId: number,
  componentId: any
},{
  active: boolean,
  email: string,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  role: string
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      active: false,
      email: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "",
      role: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    var self = this;

    const token = await AsyncStorage.getItem(TOKEN_KEY) || '';
    
    axios.get(`https://tq-template-server-sample.herokuapp.com/users/${this.props.userId}` , {
      headers: {
        Authorization: token,
      }
    })
    .then(function (response: any){
      self.setState({
        active: response.data.data.active,
        email: response.data.data.email,
        createdAt: new Date(response.data.data.createdAt),
        updatedAt: new Date(response.data.data.updatedAt),
        name: response.data.data.name,
        role: response.data.data.role
      })
    })
    .catch(function (error){
      console.log(error);
      Alert.alert('Um erro ocorreu ao buscar os detalhes do usuário');
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={[styles.textWelcome, {alignSelf: 'center'}]}>{this.state.name}</Text>
        <Text style={[styles.text, {paddingHorizontal: 10}]}>Função: {this.state.role}</Text>
        <Text style={[styles.text, {paddingHorizontal: 10}]}>Email: {this.state.email}</Text>
        <Text style={[styles.text, {paddingHorizontal: 10}]}>Criado: {this.formatDate(this.state.createdAt)}</Text>
        <Text style={[styles.text, {paddingHorizontal: 10}]}>Atualizado: {this.formatDate(this.state.updatedAt)}</Text>
        <Text style={[styles.text, {paddingHorizontal: 10}]}>{this.state.active ? "Usuário ativo" : "Usuário desativado"}</Text>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight 
            onPress={() => {
              Navigation.dismissModal(this.props.componentId)}
            }
            style={styles.button}>
            <Text style={styles.textButton}>Fechar</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  };

  formatDate(paramDate: Date) {
    return `${paramDate.getDate()}/${paramDate.getMonth() + 1}/${paramDate.getFullYear()}, ${paramDate.toLocaleTimeString()}`
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Detalhes do Usuários'
        },
      }
    };
  };
}
