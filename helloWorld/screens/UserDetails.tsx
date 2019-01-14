import React from 'react';
import {
  View, AsyncStorage, Alert, Text, TouchableHighlight, Picker
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
  role: string,
  editar: boolean
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      role: "",
      editar: false
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

        <UserInputText
          title="Nome" 
          value={this.state.name} 
          editable={this.state.editar}
          onChangeText={(name: string) => this.setState({name: name})}
          />
          
        <UserInputText 
          title="E-mail" 
          value={this.state.email} 
          editable={this.state.editar}
          onChangeText={(email: string) => this.setState({email: email})}
          />

        { this.getRoleFormat()}

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight 
            onPress={() => {
              this.setState({editar: !this.state.editar})
            }}
            style={styles.button}>
            <Text style={styles.textButton}>{this.state.editar ? 'Salvar' : 'Editar'}</Text>
          </TouchableHighlight>
        </View>

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


  getRoleFormat() {
    if (this.state.editar){
      return (
        <View style={[styles.inputConteiner, {paddingVertical: 0, paddingBottom: 10}]}>
          <Text style={[styles.text]}>Função:</Text>
          <Picker
            style={[styles.onePicker, {alignSelf:'center'}]} itemStyle={styles.onePickerItem}
            selectedValue={this.state.role}
            enabled={this.state.editar}
            onValueChange={(itemValue) => this.setState({role: itemValue})}>
            <Picker.Item label="Usuário" value="user" />
            <Picker.Item label="Administrador" value="admin" />
          </Picker>
        </View>
        )
    }
    else {
      return (
        <UserInputText 
          title="Função" 
          value={this.state.role} 
          editable={this.state.editar}
          onChangeText={(role: string) => this.setState({role: role})}/>
      )
    }
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
