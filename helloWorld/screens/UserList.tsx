import React from 'react'
import {
  View, FlatList, Text, AsyncStorage, Alert
} from 'react-native'

import { styles } from '../scr/styles';
import UserListItem from '../component/UserListItem';
import { TOKEN_KEY } from '../scr/config';

export default class HomePage extends React.Component<{},{
  listData: {
    key: string,
    username: string,
    role: string,
  }[],
  page: number,
}> {

  constructor(props: any) {
    super(props);
    this.state = { 
      listData: [],
      page: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  renderItem(user: any) {
    return <UserListItem user={user}/>
  };

  async getData() {
    var res = this.state.listData;
    var page = this.state.page;

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY) || '';
      
      const parameters = {'page': this.state.page,'window': 30}
      const url = 'https://tq-template-server-sample.herokuapp.com/users?pagination='+JSON.stringify(parameters);
      var response = await fetch(url,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });
      var responseJson = await response.json();
      responseJson.data.forEach((user: any) => {
        res.push({
          key: user.id.toString(),
          username: user.name,
          role: user.role
        });
      });
      if (responseJson.pagination.totalPages >= this.state.page) page++;
      this.setState({listData: res, page: page});
    }catch (error) {
      Alert.alert('Erro ao buscar a lista de usuário');
    }
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
