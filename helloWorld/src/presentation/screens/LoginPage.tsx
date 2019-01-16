import React, { Component } from 'react';
import {
  Text, 
  View, 
  TouchableHighlight, 
  Alert, 
  ActivityIndicator, 
  Modal, 
  Switch
} from 'react-native';

import { styles } from '../styles'
import CompInputText from '../components/CompInputText';
import ValidatorEmail from '../../domain/ValidatorEmail';
import ValidatorPassword from '../../domain/ValidatorPassword';
import Login from '../../domain/Login';
import { IUser } from '../../domain/IUser';

export default class LoginPage extends Component<{}, { 
  email: string, 
  password: string, 
  loading: boolean,
  rememberMe: boolean,
}> 
{
  private emailInput: CompInputText | null = null;
  private passwordInput: CompInputText | null = null;

  private login: Login;

  constructor(props: any) {
    super(props);
    this.state = { 
      email: '', 
      password: '' , 
      loading: false,
      rememberMe: false,
    };
    this.login = new Login();
  }

  activityIndicatorEnd = (alertMessage: string, alertDetais?: string) => {
    this.setState({ 
      loading: false, 
      email : '', 
      password : ''
    },
      () => setTimeout( () => {
        Alert.alert(alertMessage, alertDetais)
      }, 10)
    );
  };

  onSubmit = async () => {
    var error = false;
    var isFocus = false; 
    var self = this;

    if (this.emailInput && !this.emailInput.isValid()){
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }

    if (this.passwordInput && !this.passwordInput.isValid(4)){
      if (!isFocus) {this.passwordInput.focus(); isFocus = true};
      error = true;
    }

    if (!error){
      this.setState({loading: true});
      try {
        var user = await this.login.loginRequest(this.state.email, this.state.password, this.state.rememberMe);
        if (!(typeof user === "string"))
          self.activityIndicatorEnd("Login feito com sucesso.", "Seja bem-vindo " + user.username);
      } catch (error) {
        self.activityIndicatorEnd("Falha no login.", error);
      }
    }
  };

  render() {
    return (
      <View style={styles.conteiner}>

        <CompInputText 
          title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email })}
          } 
          keyboardType='email-address'
          ref={(input) => { this.emailInput = input}}
          onSubmitEditing={() => { if (this.passwordInput) this.passwordInput.focus()}}
          editable={!this.state.loading}
          value={this.state.email}
          validator={new ValidatorEmail()}
        />

        <CompInputText 
          title='Senha'
          onChangeText={(password: string) => {
            this.setState({ password: password })}
          } 
          ref={(input) => { this.passwordInput = input}}
          onSubmitEditing={() => this.onSubmit()}
          editable={!this.state.loading}
          secureTextEntry={true}
          validator={new ValidatorPassword()}
          value={this.state.password}
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
  };
}
