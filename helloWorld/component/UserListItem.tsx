import React, { Component, Props } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../scr/styles';

class UserListItem extends Component<{user: any}, {}> {
    render() {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: 15
                }}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>{this.props.user.item.username}</Text>
                <Text style={{fontSize: 16, marginHorizontal: 25, color: '#303030', margin: 5}}>Função: {this.props.user.item.role}</Text>
            </View>
        )
    }
}

export default UserListItem