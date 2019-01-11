const { Navigation } = require('react-native-navigation');
import Login from '../screens/Login';
import HomePage from '../screens/HomePage';
import Initializing from '../screens/Initializing';
import UserList from '../screens/UserList';
import UserDetails from '../screens/UserDetails';

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('HomePage', () => HomePage);
  Navigation.registerComponent('Initializing', () => Initializing);
  Navigation.registerComponent('UserList', () => UserList);
  Navigation.registerComponent('UserDetails', () => UserDetails);
}