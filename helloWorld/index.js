import {Navigation} from 'react-native-navigation';
import {registerScreens} from './scr/screens';
import {addInterceptor} from './scr/interceptor';

registerScreens();
addInterceptor();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});