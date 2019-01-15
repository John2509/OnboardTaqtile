import React from 'react';
import {
  View, Alert, Text, TouchableHighlight, Picker
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { styles } from '../styles';
import { KEYS } from '../../data/config';
import UserInputText from '../components/UserInputText';
import { user } from '../components/UserListItem';
import ValidatorName from '../../domain/ValidatorName';
import ValidatorEmail from '../../domain/ValidatorEmail';
import { LocalData } from '../../data/LocalData';
import { ApiData } from '../../data/ApiData';

export default class UserDetails extends React.Component<{
  userId: number,
  onChangeUser: {(editedUser: user): void}
  componentId: any
},{
  email: string,
  name: string,
  role: string,
  edit: boolean,
}> {

  private nameInput: UserInputText | null = null;
  private emailInput: UserInputText | null = null;

  private localData: LocalData;
  private apiData: ApiData;

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      role: "",
      edit: false,
    };
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    var self = this;

    const token = await this.localData.get(KEYS.TOKEN_KEY);

    this.apiData.getUser(this.props.userId, token)
    .then(function (response: any){
      self.setState({
        email: response.data.data.email,
        name: response.data.data.name,
        role: response.data.data.role
      })
    })
    .catch(function (error: any){
      console.log(error);
      Alert.alert('Um erro ocorreu ao buscar os detalhes do usuário');
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>

        <UserInputText
          title="Nome" 
          value={this.state.name} 
          editable={this.state.edit}
          onChangeText={(name: string) => this.setState({name: name})}
          ref={(input) => { this.nameInput = input}}
          validator={new ValidatorName()}
          onSubmitEditing={() => { if (this.emailInput) this.emailInput.focus()}}
          />
          
        <UserInputText 
          title="E-mail" 
          value={this.state.email} 
          editable={this.state.edit}
          onChangeText={(email: string) => this.setState({email: email})}
          ref={(input) => { this.emailInput = input}}
          keyboardType='email-address'
          validator={new ValidatorEmail()}
          onSubmitEditing={() => this.editOrSave()}
          />

        { this.getRoleFormat() }

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight 
            onPress={() => this.editOrSave()}
            style={styles.button}>
            <Text style={styles.textButton}>{this.state.edit ? 'Salvar' : 'Editar'}</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.buttonConteiner, {width: '100%'}]}>
          <TouchableHighlight 
            onPress={() => {this.close()}}
            style={styles.button}>
            <Text style={styles.textButton}>Fechar</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  };

  private close() {
    var editedUser: user = {
      id: this.props.userId,
      username: this.state.name,
      role: this.state.role
    };
    this.props.onChangeUser(editedUser);
    Navigation.dismissModal(this.props.componentId);
  }

  async editOrSave() {
    if (!this.state.edit){
      this.setState({edit: !this.state.edit});
    }
    else {
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

      if (!error){
        this.sendEdit();
      }
    }
  }


  async sendEdit() {
    var self = this;
    const token = await this.localData.get(KEYS.TOKEN_KEY);

    this.apiData.editUser(this.props.userId, this.state.name, this.state.email, this.state.role, token)
    .then(function (response: any){
      self.setState({edit: !self.state.edit});
      Alert.alert('Edição feita com sucesso!')
    })
    .catch(function (error){
      if (error.response) {
        var totalError = '';
        error.response.data.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        Alert.alert("Falha ao editar.", totalError);
      }
    });
  }
  
  getRoleFormat() {
    if (this.state.edit){
      return (
        <View style={[styles.inputConteiner, {paddingVertical: 0, paddingBottom: 10}]}>
          <Text style={[styles.text]}>Função:</Text>
          <Picker
            style={[styles.onePicker, {alignSelf:'center'}]} itemStyle={styles.onePickerItem}
            selectedValue={this.state.role}
            enabled={this.state.edit}
            onValueChange={(itemValue) => this.setState({role: itemValue})}>
            <Picker.Item label="Usuário" value="user" />
            <Picker.Item label="Administrador" value="admin" />
          </Picker>
        </View>
        )
    }
    else {
      return (
        <UserInputText 
          title="Função" 
          value={this.state.role} 
          editable={this.state.edit}
          onChangeText={(role: string) => this.setState({role: role})}/>
      )
    }
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Detalhes do Usuários'
        },
      }
    };
  };
}
