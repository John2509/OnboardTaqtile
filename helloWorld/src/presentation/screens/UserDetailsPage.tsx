import React from 'react';
import {
  View, Alert, Text, TouchableHighlight, Picker
} from 'react-native';

import { styles } from '../styles';
import CompInputText from '../components/CompInputText';
import ValidatorName from '../../domain/ValidatorName';
import ValidatorEmail from '../../domain/ValidatorEmail';
import UserDetails from '../../domain/UserDetails';
import { IUser } from '../../domain/IUser';

export default class UserDetailsPage extends React.Component<{
  userId: number,
  onChangeUser: {(editedUser: IUser): void}
  componentId: any
},{
  email: string,
  name: string,
  role: string,
  edit: boolean,
}> {

  private nameInput: CompInputText | null = null;
  private emailInput: CompInputText | null = null;

  private userDetails: UserDetails;

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      role: "",
      edit: false,
    };
    this.userDetails = new UserDetails();
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Detalhes do Usuários'
        },
      }
    };
  };

  async componentDidMount() {
    try {
      var user = await this.userDetails.getData(this.props.userId);
      if (!(typeof user === "string")){
        this.setState({
          email: user.email,
          name: user.username,
          role: user.role
        })
      }
      else throw new Error();
    }
    catch{
      Alert.alert('Um erro ocorreu ao buscar os detalhes do usuário');
      this.userDetails.close(this.props.componentId);
    }
  };

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
        try {
          await this.userDetails.sendEdit(this.props.userId, this.state.name, this.state.email, this.state.role);
          this.setState({edit: !this.state.edit});
          Alert.alert('Edição feita com sucesso!')
        }
        catch (error){
          Alert.alert("Falha ao editar.", error);
        }
      }
    }
  }

  private close() {
    this.userDetails.close(this.props.componentId, this.props.userId, this.props.onChangeUser);
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>

        <CompInputText
          title="Nome" 
          value={this.state.name} 
          editable={this.state.edit}
          onChangeText={(name: string) => this.setState({name: name})}
          ref={(input) => { this.nameInput = input}}
          validator={new ValidatorName()}
          onSubmitEditing={() => { if (this.emailInput) this.emailInput.focus()}}
          />
          
        <CompInputText 
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

        <View style={styles.bottomConteiner}>

          <View style={[styles.buttonConteiner, {width: '50%'}]}>
            <TouchableHighlight 
              onPress={() => {this.close()}}
              style={[styles.button, {backgroundColor:'#DDDDDD'}]}>
              <Text style={[styles.textButton, {color: '#222222'}]}>Fechar</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.buttonConteiner, {width: '50%'}]}>
            <TouchableHighlight 
              onPress={() => this.editOrSave()}
              style={styles.button}>
              <Text style={styles.textButton}>{this.state.edit ? 'Salvar' : 'Editar'}</Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    );
  };

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
        <CompInputText 
          title="Função" 
          value={this.state.role} 
          editable={this.state.edit}
          onChangeText={(role: string) => this.setState({role: role})}/>
      )
    }
  };
}
