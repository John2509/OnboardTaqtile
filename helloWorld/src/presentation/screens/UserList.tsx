import React from 'react';
import {
  View, FlatList, Alert, TouchableHighlight, Text
} from 'react-native';

import UserListItem, { user } from '../components/UserListItem';
import { KEYS } from '../../data/config';
import { styles } from '../styles';
import { Navigation } from 'react-native-navigation';
import { LocalData } from '../../data/LocalData';
import { ApiData } from '../../data/ApiData';

export default class UserList extends React.Component<{
  componentId: any
},{
  listData: Array<user>,
  page: number,
}> {

  private localData: LocalData;
  private apiData: ApiData;

  constructor(props: any) {
    super(props);
    this.state = { 
      listData: [],
      page: 0,
    };
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  componentDidMount() {
    this.getData();
  }

  private renderItem(user: any) {
    return <UserListItem 
      user={user} 
      onChangeUser={(editedUser: user, index: number) => this.onChangeUser(editedUser, index)}/>
  }

  private onChangeUser(editedUser: user, index: number){
    var list = this.state.listData;
    list[index] = editedUser;
    this.setState({listData: list});
  }

  async getData() {

    var list = this.state.listData;
    var page = this.state.page;
    var self = this;

    const token = await this.localData.get(KEYS.TOKEN_KEY);

    this.apiData.getUserList(this.state.page, 30, token)
    .then(function (response: any){
      response.data.data.forEach((user: any) => {
        list.push({
          username: user.name,
          role: user.role,
          id: user.id
        });
      });
      self.setState({listData: list, page: page+1});
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
          renderItem={(user) => this.renderItem(user)}
          ItemSeparatorComponent={this.renderSeparator}
          style={{flex:1}}
          onEndReached={() => {this.getData()}}
          onEndReachedThreshold={0.5}
          keyExtractor= {(item: user) => item.id.toString()}
        />
        
        <View style={[styles.buttonConteiner, {width: '100%', marginBottom: 10, borderTopColor: '#BEC0BE', borderTopWidth: 2}]}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'UserCreate',
                }
              });
            }}>
            <Text style={styles.textButton}>Criar Usuário</Text>
          </TouchableHighlight>
        </View>
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
