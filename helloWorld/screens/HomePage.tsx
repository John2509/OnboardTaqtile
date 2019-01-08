import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Navigation } from 'react-native-navigation';

interface Props {}
export default class HomePage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Bem Vindo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

Navigation.registerComponent(`HomePage`, () => HomePage);
