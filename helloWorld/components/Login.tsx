import React, { Component } from 'react';
import { AppRegistry, TextInput, Text, View, StyleSheet, TouchableHighlight, Alert, Dimensions, ActivityIndicator, Modal, Switch } from 'react-native';

interface Props {}
export default class Login extends Component<Props, { 
  email: string, 
  senha: string, 
  loading: boolean,
  emailError: string,
  senhaError: string,
}> 
{
  private emailInput: any;
  private senhaInput: any;
  
  constructor(props: Props) {
    super(props);
    this.state = { 
      email: 'admin@taqtile.com', 
      senha: '1111' , 
      loading: false,
      emailError: '',
      senhaError: '',
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

        <View>
          <Switch></Switch>
        </View>

        <View style={styles.buttonConteiner}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit}
            disabled={this.state.loading}
          >
            <Text style={[styles.text, {color: '#FFFFFF', textAlign: 'center'}]}>LOGIN</Text>
          </TouchableHighlight>
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

  activityIndicatorTimeout = () => {
    //setTimeout(this.activityIndicatorEnd, 3000);
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
          rememberMe: false,
        }),
      });
      var responseJson = await response.json();
      if (responseJson.data) {
        this.activityIndicatorEnd("Login feito com sucesso.", "Seja bem-vindo " + responseJson.data.user.name);
        console.log(responseJson.data);
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
      //console.log('Fazendo Login...', 'E-mail: ' + this.state.email + '.\nSenha: ' + this.state.senha + '.');
      this.setState({loading: true});
      this.loginRequest();
    }
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: 'left',
  },
  textInput: {
    textAlign: 'left', 
    borderBottomColor: '#800080',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  conteiner: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFDFF',
  },
  button: {
    padding: 10,
    backgroundColor: '#660066',
    borderRadius:25,
  },
  inputConteiner: {
    width: Dimensions.get('window').width, 
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonConteiner: {
    paddingTop: 10, 
    paddingRight: 20, 
    alignSelf: 'flex-end'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#2F001F40'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textError: {
    fontSize: 10,
    margin: 5,
    textAlign: 'left',
    color: '#EE0040',
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('Login', () => Login);
