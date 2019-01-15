import { Navigation } from 'react-native-navigation';
import Login from '../presentation/screens/Login';
import HomePage from '../presentation/screens/HomePage';
import Initializing from '../presentation/screens/Initializing';
import UserList from '../presentation/screens/UserList';
import UserDetails from '../presentation/screens/UserDetails';
import UserCreate from '../presentation/screens/UserCreate';

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('HomePage', () => HomePage);
  Navigation.registerComponent('Initializing', () => Initializing);
  Navigation.registerComponent('UserList', () => UserList);
  Navigation.registerComponent('UserDetails', () => UserDetails);
  Navigation.registerComponent('UserCreate',  () => UserCreate);
}