/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Login from './screens/Login';
import { registerScreens } from './screens/index';

interface Props {}
export default class App extends Component<Props> {
  render() {
    registerScreens();
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          component: {
            name: 'Login'
          }
        }
      });
    });
    return null;
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
