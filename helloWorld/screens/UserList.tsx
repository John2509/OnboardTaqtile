import React from 'react';
import {
  View, FlatList, Text, AsyncStorage, Alert
} from 'react-native';
import axios from 'axios';
import { Navigation } from 'react-native-navigation';

import { styles } from '../scr/styles';
import UserListItem from '../component/UserListItem';
import { TOKEN_KEY } from '../scr/config';

export default class HomePage extends React.Component<{
  componentId: any
},{
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
          role: user.role
        });
      });
      self.setState({listData: res, page: page+1});
    })
    .catch(function (error){
      console.log(error);
      Navigation.pop(self.props.componentId)
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
