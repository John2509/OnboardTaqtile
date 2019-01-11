import React, { Component, Props } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import { styles } from '../scr/styles';
import { Navigation } from 'react-native-navigation';

class UserListItem extends Component<{
  user: any
}, {}> {

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
              stack: {
                children: [{
                  component: {
                    name: 'UserDetails',
                    passProps: {
                      userId: this.props.user.item.id
                    },
                  }
                }]
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

export default UserListItem