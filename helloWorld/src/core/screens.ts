import { Navigation } from 'react-native-navigation';
import LoginPage from '../presentation/screens/LoginPage';
import HomePage from '../presentation/screens/HomePage';
import InitializingPage from '../presentation/screens/InitializingPage';
import UserListPage from '../presentation/screens/UserListPage';
import UserDetailsPage from '../presentation/screens/UserDetailsPage';
import UserCreatePage from '../presentation/screens/UserCreatePage';

export function registerScreens() {
  Navigation.registerComponent('Login', () => LoginPage);
  Navigation.registerComponent('HomePage', () => HomePage);
  Navigation.registerComponent('Initializing', () => InitializingPage);
  Navigation.registerComponent('UserList', () => UserListPage);
  Navigation.registerComponent('UserDetails', () => UserDetailsPage);
  Navigation.registerComponent('UserCreate',  () => UserCreatePage);
}