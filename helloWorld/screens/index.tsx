const { Navigation } = require('react-native-navigation');
const Login = require('./Login');
const HomePage = require('./HomePage');

export function registerScreens() {
    Navigation.registerComponent('Login', () => Login);
    Navigation.registerComponent('HomePage', () => HomePage);
}