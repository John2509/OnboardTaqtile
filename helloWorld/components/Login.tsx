import React, { Component } from 'react';
import { AppRegistry, TextInput, Text, View, StyleSheet, TouchableHighlight, Alert, Dimensions } from 'react-native';

interface Props {}
export default class Login extends Component<Props, { email: string, senha: string }> {
  private senhaInput: any;
  
  constructor(props: Props) {
    super(props);
    this.state = { email: '', senha: '' };
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
            keyboardType="email-address"
            blurOnSubmit={false}
            onSubmitEditing={() => this.senhaInput.focus()}
          />
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
            onSubmitEditing={() => this.onSubmit}
          />
        </View>

        <View style={styles.buttonConteiner}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit}
          >
            <Text style={[styles.text, {color: '#FFFFFF', textAlign: "center"}]}>LOGIN</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }

  onSubmit = () => {
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var senhaRegex1 = new RegExp(/.{7,}/);
    var senhaRegex2 = new RegExp(/\d/);
    var senhaRegex3 = new RegExp(/[a-zA-Z]/);
    if (this.state.email == '' || this.state.senha == ''){
      Alert.alert("Erro no Login.", "Por favor insira E-mail e Senha.");
    }
    else if (!emailRegex.test(this.state.email)){
      Alert.alert("Erro no Login.", "Por favor insira um E-mail válido.");
    }
    else if (!senhaRegex1.test(this.state.senha)){
      Alert.alert("Erro no Login.", "Por favor insira uma Senha com pelo menos 7 caracteres.");
    }
    else if (!senhaRegex2.test(this.state.senha)){
      Alert.alert("Erro no Login.", "Por favor insira uma Senha com pelo menos 1 digito.");
    }
    else if (!senhaRegex3.test(this.state.senha)){
      Alert.alert("Erro no Login.", "Por favor insira uma Senha com pelo menos 1 caractere alfanumérico.");
    }
    else {
      Alert.alert("Fazendo Login...", "E-mail: " + this.state.email + ".\nSenha: " + this.state.senha + ".");
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
  },
  buttonConteiner: {
    paddingTop: 10, 
    paddingRight: 20, 
    alignSelf: "flex-end"
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('Login', () => Login);
