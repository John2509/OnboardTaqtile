import React, { Component } from "react";
import { View, Text, Picker, TouchableHighlight, Alert, Modal, ActivityIndicator} from "react-native";
import { Navigation } from "react-native-navigation";

import UserInputText from "../components/UserInputText";
import { styles } from "../styles";
import { KEYS } from "../../data/config";
import ValidatorName from "../../domain/ValidatorName";
import ValidatorEmail from "../../domain/ValidatorEmail";
import ValidatorPassword from "../../domain/ValidatorPassword";
import { LocalData } from "../../data/LocalData";
import { ApiData } from "../../data/ApiData";

export default class UserCreate extends Component<{
  componentId: any,
},{
  name: string,
  email: string,
  password: string,
  role: string,

  loading: boolean,
}>{
  private nameInput: UserInputText | null = null;
  private emailInput: UserInputText | null = null;
  private passwordInput: UserInputText | null = null;

  private localData: LocalData;
  private apiData: ApiData;

  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'user',

      loading: false,
    }
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  render() {
    return (
      <View style={styles.conteiner}>

        <UserInputText 
          title='Nome'
          onChangeText={(name: string) => {
            this.setState({ name: name})
          }}
          ref={(input) => this.nameInput = input}
          onSubmitEditing={() => { if (this.emailInput) this.emailInput.focus()}}
          editable={!this.state.loading}
          value={this.state.name}
          validator={new ValidatorName()}/>

        <UserInputText title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email})
          }}
          keyboardType='email-address'
          ref={(input) => { this.emailInput = input}}
          onSubmitEditing={() => { if (this.passwordInput) this.passwordInput.focus()}}
          editable={!this.state.loading}
          value={this.state.email}
          validator={new ValidatorEmail()}/>

        <UserInputText title='Senha'
          onChangeText={(password: string) => {
            this.setState({ password: password})
          }}
          secureTextEntry={true}
          ref={(input) => { this.passwordInput = input}}
          onSubmitEditing={() => this.onSubmit()}
          editable={!this.state.loading}
          value={this.state.password}
          validator={new ValidatorPassword()}/>

        <View style={[styles.inputConteiner, {paddingVertical: 0, paddingBottom: 10}]}>
          <Text style={[styles.text]}>Função:</Text>
          <Picker
            style={[styles.onePicker, {alignSelf:'center'}]} itemStyle={styles.onePickerItem}
            selectedValue={this.state.role}
            enabled={!this.state.loading}
            onValueChange={(itemValue) => this.setState({role: itemValue})}>
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

    if (this.nameInput && !this.nameInput.isValid()){
      if (!isFocus) {this.nameInput.focus(); isFocus = true};
      error = true;
    }

    if (this.emailInput && !this.emailInput.isValid()){
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }

    if ( this.passwordInput && !this.passwordInput.isValid()){
      if (!isFocus) {this.passwordInput.focus(); isFocus = true};
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

    const token = await this.localData.get(KEYS.TOKEN_KEY);

    this.apiData.creatUser(this.state.name, this.state.password, this.state.email, this.state.role, token)
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