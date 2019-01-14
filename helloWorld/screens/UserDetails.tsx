import React from 'react';
import {
  View, AsyncStorage, Alert, Text, TouchableHighlight, Picker
} from 'react-native';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';

import { styles } from '../scr/styles';
import { TOKEN_KEY } from '../scr/config';
import UserInputText from '../component/UserInputText';
import { validateName, validateEmail } from '../scr/validator';

export default class UserDetails extends React.Component<{
  userId: number,
  componentId: any
},{
  email: string,
  name: string,
  role: string,
  editar: boolean,

  nameError: string
  emailError: string,
}> {

  private nameInput: any;
  private emailInput: any;

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      role: "",
      editar: false,

      nameError: '',
      emailError: '',
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
          setRef={(input:any) => { this.nameInput = input}}
          errorMessage={this.state.nameError}
          />
          
        <UserInputText 
          title="E-mail" 
          value={this.state.email} 
          editable={this.state.editar}
          onChangeText={(email: string) => this.setState({email: email})}
          setRef={(input:any) => { this.emailInput = input}}
          errorMessage={this.state.emailError}
          />

        { this.getRoleFormat()}

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight 
            onPress={() => this.editOrSave()}
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

  async editOrSave() {
    if (!this.state.editar){
      this.setState({editar: !this.state.editar});
    }
    else {
      var error = false;
      var isFocus = false; 

      var nomeValidate = validateName(this.state.name);

      this.setState({nameError: nomeValidate.message});
      if (nomeValidate.error){
        if (!isFocus) {this.nameInput.focus(); isFocus = true};
        error = true;
      }

      var emailValidate = validateEmail(this.state.email);

      this.setState({emailError: emailValidate.message});
      if (emailValidate.error){
        if (!isFocus) {this.emailInput.focus(); isFocus = true};
        error = true;
      }

      if (!error){
        this.sendEdit();
      }
    }
  }


  async sendEdit() {
    var self = this;
    const token = await AsyncStorage.getItem(TOKEN_KEY) || '';
    
    axios.put(`https://tq-template-server-sample.herokuapp.com/users/${this.props.userId}`,
    {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    })
    .then(function (response: any){
      self.setState({editar: !self.state.editar});
      Alert.alert('Edição feita com sucesso!')
    })
    .catch(function (error){
      if (error.response) {
        var totalError = '';
        error.response.data.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        Alert.alert("Falha ao editar.", totalError);
      }
    });
  }
  
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
