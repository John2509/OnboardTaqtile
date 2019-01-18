import React, { Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../styles';
import { IUser } from '../../domain/User/IUser';

export default class CompListItem extends Component<{
  user: {
    item: IUser,
    index: number
  },
  onChangeUser: {(editedUser: IUser, index: number): void},
  openDetais: {(userId: number, onChangeUser: {(editedUser: IUser): void}): void}
}, {}> {

  private onChangeUser(editedUser: IUser){
    this.props.onChangeUser(editedUser, this.props.user.index);
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>

        <View style={{ flex: 2, marginHorizontal: 15 }}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.user.item.username}</Text>
          <Text style={styles.textSmall}>Função: {this.props.user.item.role}</Text>
        </View>

        <TouchableHighlight 
          style={styles.buttonCircular}
          onPress={() => { this.props.openDetais(this.props.user.item.id, (editedUser: IUser) => this.onChangeUser(editedUser))}}>
          <Text style={styles.textButtonCircular}>→</Text>
        </TouchableHighlight>

      </View>
    )
  }
}