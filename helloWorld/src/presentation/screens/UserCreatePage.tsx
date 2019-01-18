import React, { Component } from "react";
import { View, Text, Picker, TouchableHighlight, Alert, Modal, ActivityIndicator} from "react-native";

import CompInputText from "../components/CompInputText";
import { styles } from "../styles";
import ValidatorName from "../../domain/Validator/ValidatorName";
import ValidatorEmail from "../../domain/Validator/ValidatorEmail";
import ValidatorPassword from "../../domain/Validator/ValidatorPassword";
import UserCreate from "../../domain/UserCreate";
import UserFactory from "../../domain/User/UserFactory";

export default class UserCreatePage extends Component<{
  componentId: any,
},{
  name: string,
  email: string,
  password: string,
  role: string,

  loading: boolean,
}>{
  private nameInput: CompInputText | null = null;
  private emailInput: CompInputText | null = null;
  private passwordInput: CompInputText | null = null;

  private userCreate: UserCreate;

  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'user',

      loading: false,
    };
    this.userCreate = new UserCreate();
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Criar Usuário'
        },
        drawBehind: true,
      }
    };
  };

  activityIndicatorEnd = (success: boolean, alertMessage: string, alertDetais?: string) => {
    this.setState({ 
      loading: false, 
    },
    () => setTimeout( () => {
      Alert.alert(alertMessage, alertDetais)
    }, 10));
    if (success){
      this.userCreate.close(this.props.componentId);
    }
  };

  onSubmit = async () => {
    var error = false;
    var isFocus = false; 
    var self = this;

    if (this.nameInput && !this.nameInput.isValid()){
      if (!isFocus) {this.nameInput.focus(); isFocus = true};
      error = true;
    }

    if (this.emailInput && !this.emailInput.isValid()){
      if (!isFocus) {this.emailInput.focus(); isFocus = true};
      error = true;
    }

    if (this.passwordInput && !this.passwordInput.isValid()){
      if (!isFocus) {this.passwordInput.focus(); isFocus = true};
      error = true;
    }

    if (!error){
      this.setState({loading: true});
      try {
        var user = UserFactory.makeUser(this.state.name, this.state.email, this.state.role);
        await this.userCreate.createRequest(user, this.state.password);
        self.activityIndicatorEnd( true , "Cadastro feito com sucesso.");
      }
      catch (error) {
        self.activityIndicatorEnd( false , "Falha no Cadastro.", error);
      }
    }
  };

  render() {
    return (
      <View style={styles.conteiner}>

        <CompInputText 
          title='Nome'
          onChangeText={(name: string) => {
            this.setState({ name: name})
          }}
          ref={(input) => this.nameInput = input}
          onSubmitEditing={() => { if (this.emailInput) this.emailInput.focus()}}
          editable={!this.state.loading}
          value={this.state.name}
          validator={new ValidatorName()}/>

        <CompInputText title='E-mail'
          onChangeText={(email: string) => {
            this.setState({ email: email})
          }}
          keyboardType='email-address'
          ref={(input) => { this.emailInput = input}}
          onSubmitEditing={() => { if (this.passwordInput) this.passwordInput.focus()}}
          editable={!this.state.loading}
          value={this.state.email}
          validator={new ValidatorEmail()}/>

        <CompInputText title='Senha'
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
              onPress={() => {this.userCreate.close(this.props.componentId)}}
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
  };
}