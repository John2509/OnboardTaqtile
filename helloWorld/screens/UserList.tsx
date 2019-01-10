import React from 'react'
import {
  View, FlatList, Text
} from 'react-native'

import { styles } from '../scr/styles';
import UserListItem from '../component/UserListItem';

export default class HomePage extends React.Component<{},{
  listData: {
    key: string,
    username: string,
    role: string,
  }[],
  lastID: number
}> {

  constructor(props: any) {
    super(props);
    this.state = { 
      lastID: 0,
      listData: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  renderItem(user: any) {
    return <UserListItem user={user}/>
  };

  getData() {
    var res = this.state.listData;
    for (var i = 0; i < 30; i++){
      res.push({
        key: (i+this.state.lastID).toString(),
        username: 'Teste',
        role: 'User'
      });
    }
    this.setState({lastID: this.state.lastID+30, listData: res});
  }

  render() {
    return (
      <View style={{flex: 1, alignContent: 'center'}}>
        <FlatList
          data= {this.state.listData}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          style={{flex:1}}
          onEndReached={() => {this.getData()}}
          onEndReachedThreshold={0.3}
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
}
