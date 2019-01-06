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
import {Platform, StyleSheet, Text, View, Image, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}
export default class App extends Component<Props> {
  render() {
    let pic = {
      uri: 'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?cs=srgb&dl=animal-chihuahua-cute-39317.jpg&fm=jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World!</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Button
          onPress={function() {
            console.log("Hello World!");
          }}
          title="Hello World!"
          color="#841584"
        />
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
