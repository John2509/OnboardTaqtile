import React from 'react';
import {
  View, FlatList, Alert
} from 'react-native';

import CompListItem from '../components/CompListItem';
import { IUser } from '../../domain/User/IUser';
import UserList from '../../domain/UserList';

export default class UserListPage extends React.Component<{
  componentId: any
},{
  listData: Array<IUser>,
  page: number,
}> {

  private userList: UserList;

  constructor(props: any) {
    super(props);
    this.state = { 
      listData: [],
      page: 0,
    };
    this.userList = new UserList();
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Lista de Usuários'
        },
      }
    };
  };
  
  private onChangeUser(editedUser: IUser, index: number){
    this.setState({listData: this.userList.onChangeUser(this.state.listData, editedUser, index)});
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      var list = await this.userList.getData(this.state.page, 30, this.state.listData);
      if (!(typeof list === "string")) {
        this.setState({listData: list, page: this.state.page+1});
      }
      else throw new Error();
    }
    catch {
      Alert.alert('Um erro ocorreu ao buscar usuários');
    }
  };

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
          keyExtractor= {(item: IUser) => item.id.toString()}
        />
      </View>
    );
  };

  renderItem(user: any) {
    return <CompListItem 
      user={user} 
      onChangeUser={(editedUser: IUser, index: number) => this.onChangeUser(editedUser, index)}
      openDetais={this.userList.openUserDetails}/>
  }

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
