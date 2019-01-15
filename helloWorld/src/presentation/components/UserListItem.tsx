import React, { Component} from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../styles';
import { Navigation } from 'react-native-navigation';

export interface user {
  username : string,
  role : string,
  id : number
}

export default class UserListItem extends Component<{
  user: {
    item: user,
    index: number
  },
  onChangeUser: {(editedUser: user, index: number): void}
}, {}> {

  private onChangeUser(editedUser: user){
    this.props.onChangeUser(editedUser, this.props.user.index);
  }

  render() {
    return (
      <View style={{
        flexDirection: "row",
      }}>

        <View style={{
          flex: 2,
          marginHorizontal: 15,
        }}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.user.item.username}</Text>
          <Text style={{fontSize: 16, marginHorizontal: 25, color: '#303030', margin: 5}}>Função: {this.props.user.item.role}</Text>
        </View>

        <TouchableHighlight 
          style={{
            height: 80,
            margin: 15,
            alignSelf: "center",
            aspectRatio: 1,
            padding: 10,
            backgroundColor: '#660066',
            borderRadius:80,
            justifyContent:"center"
          }}
          onPress={() => {
            Navigation.showModal({
              component: {
                name: 'UserDetails',
                passProps: {
                  userId: this.props.user.item.id,
                  onChangeUser: (editedUser: user) => this.onChangeUser(editedUser),
                },
              }
            });
          }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize:40,
            fontWeight:"bold",
            textAlign: "center",
            textAlignVertical: "center",
            alignSelf:"center",
          }}>→</Text>
        </TouchableHighlight>

      </View>
    )
  }
}