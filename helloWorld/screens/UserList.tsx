import React from 'react';
import {
  View, FlatList, AsyncStorage, Alert
} from 'react-native';
import axios from 'axios';

import UserListItem from '../component/UserListItem';
import { TOKEN_KEY } from '../scr/config';

export default class UserList extends React.Component<{
  componentId: any
},{
  listData: {
    key: string,
    username: string,
    role: string,
    id: number
  }[],
  page: number,
  componentID: string,
}> {

  constructor(props: any) {
    super(props);
    this.state = { 
      listData: [],
      page: 0,
      componentID: this.props.componentId
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
    var self = this;

    const token = await AsyncStorage.getItem(TOKEN_KEY) || '';
    
    axios.get('https://tq-template-server-sample.herokuapp.com/users', {
      params: {
        pagination: {
          page: this.state.page,
          window: 30
        }
      },
      headers: {
        Authorization: token,
      }
    })
    .then(function (response: any){
      response.data.data.forEach((user: any) => {
        res.push({
          key: user.id.toString(),
          username: user.name,
          role: user.role,
          id: user.id
        });
      });
      self.setState({listData: res, page: page+1});
    })
    .catch(function (error){
      console.log(error);
      Alert.alert('Um erro ocorreu ao buscar usuários');
    });
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
          onEndReachedThreshold={0.45}
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
