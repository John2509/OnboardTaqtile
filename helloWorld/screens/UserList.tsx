import React from 'react'
import {
  View, FlatList, Text
} from 'react-native'

import { styles } from '../scr/styles';
import UserListItem from '../component/UserListItem';

export default class HomePage extends React.Component<{
  componentId: any,
}> {

  renderItem(user: any) {
    return <UserListItem user={user}/>
  };

  render() {
    return (
      <View style={{flex: 1, alignContent: 'center'}}>
        <FlatList
          data= {[
            {username: 'Devin', role: 'Admin'},
            {username: 'Jackson', role: 'Admin'},
            {username: 'James', role: 'Admin'},
            {username: 'Joel', role: 'User'},
            {username: 'John', role: 'User'},
            {username: 'Jillian', role: 'User'},
            {username: 'Jimmy', role: 'User'},
            {username: 'Julie', role: 'User'},
          ]}
          renderItem={this.renderItem}
          keyExtractor={user => user.username}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.headerComponent}
          style={{flex:1}}
        />
      </View>
    );
  };

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Lista de Usuários'
        },
      }
    };
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };

  headerComponent =() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: '#66006620'
        }}
      >
        <Text style={{flex: 1}}>Nome</Text>
        <Text style={{flex: 1}}>Função</Text>
      </View>
    );
  };
}
