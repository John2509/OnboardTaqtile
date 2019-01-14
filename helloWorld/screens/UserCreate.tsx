import React, { Component } from "react";
import { View, Text, Picker, TouchableHighlight, Alert, Modal, ActivityIndicator, AsyncStorage} from "react-native";
import { Navigation } from "react-native-navigation";
import axios from 'axios';

import UserInputText from "../component/UserInputText";
import { styles } from "../scr/styles";
import { validateEmail, validatePassword, validateName } from "../scr/validator";
import { TOKEN_KEY } from "../scr/config";

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

  loading: boolean,
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
      funcao: '',

      nomeError: '',
      emailError: '',
      senhaError: '',

      loading: false,
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
          editable={!this.state.loading}
          value={this.state.nome}
          />

        <UserInputText title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email})
          }}
          keyboardType='email-address'
          errorMessage={this.state.emailError}
          setRef={(input:any) => { this.emailInput = input}}
          onSubmitEditing={() => this.senhaInput.focus()}
          editable={!this.state.loading}
          value={this.state.email}/>

        <UserInputText title='Senha'
          onChangeText={(senha: string) => {
            this.setState({ senha: senha})
          }}
          secureTextEntry={true}
          errorMessage={this.state.senhaError}
          setRef={(input:any) => { this.senhaInput = input}}
          onSubmitEditing={() => this.onSubmit()}
          editable={!this.state.loading}
          value={this.state.senha}/>

        <View style={[styles.inputConteiner, {paddingVertical: 0, paddingBottom: 10}]}>
          <Text style={[styles.text]}>Função:</Text>
          <Picker
            style={[styles.onePicker, {alignSelf:'center'}]} itemStyle={styles.onePickerItem}
            selectedValue={this.state.funcao}
            enabled={!this.state.loading}
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
              }
              disabled={this.state.loading}>
              <Text style={[styles.textButton, {color: '#222222'}]}>Cancelar</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.buttonConteiner, {width: '50%'}]}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onSubmit}
              disabled={this.state.loading}>
              <Text style={styles.textButton}>Criar</Text>
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
      this.setState({loading: true});
      this.createRequest();
    }
  }

  activityIndicatorEnd = (alertMessage: string, alertDetais?: string) => {
    this.setState({ 
      loading: false, 
    },
      () => setTimeout( () => {
        Alert.alert(alertMessage, alertDetais)
      }, 10)
    );
  }

  activityIndicatorSuccess = (alertMessage: string) => {
    Navigation.dismissAllModals();
    setTimeout( () => {
      Alert.alert(alertMessage);
      }, 600);
  }

  async createRequest() {
    var self = this;

    const token = await AsyncStorage.getItem(TOKEN_KEY) || '';

    axios.post('https://tq-template-server-sample.herokuapp.com/users/', 
      {
        name: this.state.nome,
        password: this.state.senha,
        email: this.state.email,
        role: this.state.funcao
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      })
    .then(function (response: any){
      self.activityIndicatorSuccess("Cadastro feito com sucesso.");
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
}