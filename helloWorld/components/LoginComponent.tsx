import React, { Component } from 'react';
import { AppRegistry, TextInput, Text, View, StyleSheet, Button, Alert } from 'react-native';

interface Props {}
export default class LoginComponent extends Component<Props, { email: string, senha: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { email: '', senha: '' };
  }


  render() {
    return (
      <View style={styles.conteiner}>
        <View style={{height: 60, width: 300}}>
        <Text style={{
          textAlign: 'left',
          fontSize: 20
        }}>E-mail:</Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text) =>{
            var newState = { email: text, senha: this.state.senha};
            this.setState(newState)}
          } 
          value={this.state.email}
        />
        </View>
        <View style={{height: 60, width: 300}}>
          <Text style={{
            textAlign: 'left',
            fontSize: 20
          }}>Senha:</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) =>{
              var newState = { email: this.state.email, senha: text};
              this.setState(newState)}
            } 
            value={this.state.senha}
          />
        </View>
        <Button
          onPress={this.onSubmit}
          title="Login"
          color="steelblue"
        />
      </View>
    );
  }

  onSubmit(): any{
    if (this.state.email === null || this.state.email === ''){
      Alert.alert('Por Favor insira um E-mail')
    }
    else {
      Alert.alert('Fazendo login...');
    }
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
  },
  textInput: {
    textAlign: 'left', 
    borderBottomColor: 'darkblue',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  conteiner: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('LoginComponent', () => LoginComponent);

