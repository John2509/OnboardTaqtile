import React, { Component } from "react";
import { View, Text, Picker, TouchableHighlight, Alert} from "react-native";
import UserInputText from "../component/UserInputText";
import { styles } from "../scr/styles";
import { Navigation } from "react-native-navigation";
import { validateEmail, validatePassword, validateName } from "../scr/validator";

export default class UserCreate extends Component<{
  componentId: any,
},{
  nome: string,
  email: string,
  senha: string,
  funcao: string,

  nomeError: string,
  emailError: string,
  senhaError: string,
}>{
  private nomeInput: any
  private emailInput: any
  private senhaInput: any

  constructor(props: any) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      senha: '',
      funcao: 'user',
      nomeError: '',
      emailError: '',
      senhaError: '',
    }
  }

  render() {
    return (
      <View style={styles.conteiner}>

        <UserInputText 
          title='Nome'
          onChangeText={(nome: string) => {
            this.setState({ nome: nome})
          }}
          errorMessage={this.state.nomeError}
          setRef={(input:any) => { this.nomeInput = input}}
          onSubmitEditing={() => this.emailInput.focus()}
          />

        <UserInputText title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email})
          }}
          keyboardType='email-address'
          errorMessage={this.state.emailError}
          setRef={(input:any) => { this.emailInput = input}}
          onSubmitEditing={() => this.senhaInput.focus()}/>

        <UserInputText title='Senha'
          onChangeText={(senha: string) => {
            this.setState({ senha: senha})
          }}
          secureTextEntry={true}
          errorMessage={this.state.senhaError}
          setRef={(input:any) => { this.senhaInput = input}}
          onSubmitEditing={() => this.onSubmit()}/>

        <View style={[styles.inputConteiner, {paddingVertical: 0, paddingBottom: 10}]}>
          <Text style={[styles.text]}>Função:</Text>
          <Picker
            style={[styles.onePicker, {alignSelf:'center'}]} itemStyle={styles.onePickerItem}
            selectedValue={this.state.funcao}
            onValueChange={(itemValue) => this.setState({funcao: itemValue})}>
            <Picker.Item label="Usuário" value="user" />
            <Picker.Item label="Administrador" value="admin" />
          </Picker>
        </View>

        <View style={styles.bottomConteiner}>

          <View style={[styles.buttonConteiner, {width: '50%'}]}>
            <TouchableHighlight
              style={[styles.button, {backgroundColor:'#DDDDDD'}]}
              onPress={() => {
                Navigation.dismissModal(this.props.componentId)}
              }>
              <Text style={[styles.textButton, {color: '#222222'}]}>Cancelar</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.buttonConteiner, {width: '50%'}]}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onSubmit}>
              <Text style={styles.textButton}>Criar</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    );
  }

  onSubmit = () => {
    var error = false;
    var isFocus = false; 

    var nomeValidate = validateName(this.state.nome);

    this.setState({nomeError: nomeValidate.message});
    if (nomeValidate.error){
      if (!isFocus) {this.nomeInput.focus(); isFocus = true};
      error = true;
    }

    var emailValidate = validateEmail(this.state.email);

    this.setState({emailError: emailValidate.message});
    if (emailValidate.error){
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }

    var passwordValidate = validatePassword(this.state.senha);

    this.setState({senhaError: passwordValidate.message});
    if (passwordValidate.error){
      if (!isFocus) {this.senhaInput.focus(); isFocus = true};
      error = true;
    }

    if (!error){
      console.log( 
        'Nome: '+ this.state.nome+'\n'+
        'E-mail: '+ this.state.email+'\n'+
        'Senha: '+ this.state.senha+'\n'+
        'Função: '+ this.state.funcao+'\n'
      );
      Navigation.dismissModal(this.props.componentId)
    }
  }
}