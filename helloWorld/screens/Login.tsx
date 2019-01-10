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

import { goHome } from '../scr/navigation'
import { styles } from '../scr/styles'
import { USER_KEY, TOKEN_KEY } from '../scr/config'

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

        <View style={styles.inputConteiner}>
          <Text style={styles.text}>E-mail:</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(email) =>{
              this.setState({ email: email })}
            } 
            value={this.state.email}
            keyboardType='email-address'
            blurOnSubmit={false}
            ref={(input) => { this.emailInput = input; }}
            onSubmitEditing={() => this.senhaInput.focus()}
            editable={!this.state.loading}
          />
          <Text style={styles.textError}> {this.state.emailError}</Text>
        </View>

        <View style={styles.inputConteiner}>
          <Text style={styles.text}>Senha:</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(senha) =>{
              this.setState({senha: senha})
            }}
            value={this.state.senha}
            ref={(input) => { this.senhaInput = input; }}
            editable={!this.state.loading}
          />
          <Text style={styles.textError}> {this.state.senhaError}</Text>
        </View>
        
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
              disabled={this.state.loading}
              >
              <Text style={styles.textButton}>LOGIN</Text>
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
      }, 500)
    );
  }

  loginRequest = async () => {
    try {
      var response = await fetch('https://tq-template-server-sample.herokuapp.com/authenticate/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: this.state.senha,
          email: this.state.email,
          rememberMe: this.state.rememberMe
        }),
      });
      var responseJson = await response.json();
      if (responseJson.data) {
        AsyncStorage.multiSet([[USER_KEY, responseJson.data.user.name],[TOKEN_KEY, responseJson.data.token]]);
        this.activityIndicatorEnd("Login feito com sucesso.", "Seja bem-vindo " + responseJson.data.user.name);
        goHome();
      }
      else if (responseJson.errors) {
        var totalError = '';
        responseJson.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        this.activityIndicatorEnd("Falha no login.", totalError);
      }
    } catch (error) {
      this.activityIndicatorEnd("Erro no login.", error);
    }
  }

  onSubmit = () => {
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var senhaRegex1 = new RegExp(/.{4,}/);
    var senhaRegex2 = new RegExp(/\d/);
    var senhaRegex3 = new RegExp(/\w/);
    var error = false;
    var isFocus = false; 

    if (this.state.email == ''){
      this.setState({emailError: 'Por favor insira um E-mail.'});
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }
    else if (!emailRegex.test(this.state.email)){
      this.setState({emailError: 'Por favor insira um E-mail válido.'});
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }
    else {
      this.setState({emailError: ''});
    }

    if (this.state.senha == ''){
      this.setState({senhaError: 'Por favor insira uma Senha.'});
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }
    else if (!senhaRegex1.test(this.state.senha)){
      this.setState({senhaError: 'Por favor insira uma Senha com pelo menos 4 caracteres.'});
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }
    else if (!senhaRegex2.test(this.state.senha)){
      this.setState({senhaError: 'Por favor insira uma Senha com pelo menos 1 digito.'});
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }
    else if (!senhaRegex3.test(this.state.senha)){
      this.setState({senhaError: 'Por favor insira uma Senha com pelo menos 1 letra.'}); 
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }
    else {
      this.setState({senhaError: ''});
    }

    if (!error){
      this.setState({loading: true});
      this.loginRequest();
    }
  }
};
