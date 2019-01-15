import { Navigation } from 'react-native-navigation'
import { user } from '../presentation/components/UserListItem';

export const goToAuth = () => Navigation.setRoot({
  root: {
    component: {
      name: 'Login',
    },
  },
});

export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'HomePage',
          }
        }
    ],
    }
  }
});

export const dismissAllModals = () => Navigation.dismissAllModals();

export const showUserDetailsModal = (userId: number, onChangeUser:(editedUser: user)=>void) => Navigation.showModal({
  component: {
    name: 'UserDetails',
    passProps: {
      userId: userId,
      onChangeUser: (editedUser: user) => onChangeUser(editedUser),
    },
  }
});

export const pushScreen = (componentId: any, componentName: string) => Navigation.push(
  componentId, {
  component: {
    name: componentName,
  }
})