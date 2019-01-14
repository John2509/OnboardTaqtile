import React from 'react';
import {
  View, AsyncStorage, Alert, Text, TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';

import { styles } from '../scr/styles';
import { TOKEN_KEY } from '../scr/config';
import UserInputText from '../component/UserInputText';

export default class UserDetails extends React.Component<{
  userId: number,
  componentId: any
},{
  email: string,
  name: string,
  role: string
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
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
        email: response.data.data.email,
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
        <UserInputText title="E-mail" value={this.state.email} editable={false}></UserInputText>
        <UserInputText title="Função" value={this.state.role} editable={false}></UserInputText>

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
