import React, { Component, Props } from 'react';
import { View, Text } from 'react-native';

class UserListItem extends Component<{user: any}, {}> {
    render() {
        console.log(this.props.user)
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-evenly'
                }}>
                <Text style={{flex:1}}>{this.props.user.item.username}</Text>
                <Text style={{flex:1}}>{this.props.user.item.role}</Text> 
            </View>
        )
    }
}

export default UserListItem