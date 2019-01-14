import React, { Component } from 'react';
import {  TextInput, 
  Text, 
  View, 
  TouchableHighlight, 
  Alert, 
  ActivityIndicator, 
  Modal, 
  Switch,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';

import { goHome } from '../scr/navigation'
import { styles } from '../scr/styles'
import { USER_KEY, TOKEN_KEY } from '../scr/config'
import { validateEmail, validatePassword } from '../scr/validator';
import UserInputText from '../component/UserInputText';

export default class Login extends Component<{}, { 
  email: string, 
  senha: string, 
  loading: boolean,
  emailError: string,
  senhaError: string,
  rememberMe: boolean,
}> 
{
  private emailInput: any;
  private senhaInput: any;

  constructor(props: any) {
    super(props);
    this.state = { 
      email: '', 
      senha: '' , 
      loading: false,
      emailError: '',
      senhaError: '',
      rememberMe: false,
    };
  }

  render() {
    return (
      <View style={styles.conteiner}>

        <UserInputText 
          title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email })}
          } 
          errorMessage={this.state.emailError}
          keyboardType='email-address'
          setRef={(input: any) => { this.emailInput = input}}
          onSubmitEditing={() => this.senhaInput.focus()}
          editable={!this.state.loading}
        />

        <UserInputText 
          title='Senha'
          onChangeText={(senha: string) => {
            this.setState({ senha: senha })}
          } 
          errorMessage={this.state.senhaError}
          setRef={(input: any) => { this.senhaInput = input}}
          onSubmitEditing={() => this.onSubmit()}
          editable={!this.state.loading}
          secureTextEntry={true}
        />

        <View style={styles.bottomConteiner}>
          <View style={styles.switchConteiner}>
            <Switch
              onValueChange = {(value) => this.setState({rememberMe: value})}
              value = {this.state.rememberMe}
              trackColor = {{false: '#F0F0F0', true: '#803080'}}
              thumbColor = {'#F0F0F0'}>
            </Switch>
            <Text style={styles.text}>Lembre de mim</Text>
          </View>

          <View style={styles.buttonConteiner}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onSubmit}
              disabled={this.state.loading}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.loading}
          onRequestClose={() => null}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size='large' color='#803080' animating={this.state.loading}/>
            </View>
          </View>
        </Modal>

      </View>
    );
  }

  activityIndicatorEnd = (alertMessage: string, alertDetais?: string) => {
    this.setState({ 
      loading: false, 
      email : '', 
      senha : ''
    },
      () => setTimeout( () => {
        Alert.alert(alertMessage, alertDetais)
      }, 10)
    );
  }

  loginRequest = async () => {
    var self = this;
    axios.post('https://tq-template-server-sample.herokuapp.com/authenticate/', {
      password: this.state.senha,
      email: this.state.email,
      rememberMe: this.state.rememberMe
    })
    .then(function (response: any){
      AsyncStorage.multiSet([[USER_KEY, response.data.data.user.name],[TOKEN_KEY, response.data.data.token]]);
      self.activityIndicatorEnd("Login feito com sucesso.", "Seja bem-vindo " + response.data.data.user.name);
      goHome();
    })
    .catch(function (error){
      if (error.response) {
        var totalError = '';
        error.response.data.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        self.activityIndicatorEnd("Falha no login.", totalError);
      }
      else {
        self.activityIndicatorEnd("Erro no login.");
      }
    });
  }

  onSubmit = () => {
    var error = false;
    var isFocus = false; 

    var emailValidate = validateEmail(this.state.email);

    this.setState({emailError: emailValidate.message});
    if (emailValidate.error){
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }

    var passwordValidate = validatePassword(this.state.senha, 4);

    this.setState({senhaError: passwordValidate.message});
    if (passwordValidate.error){
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }

    if (!error){
      this.setState({loading: true});
      this.loginRequest();
    }
  }
};
