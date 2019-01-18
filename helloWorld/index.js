import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/core/screens';
import {addInterceptor} from './src/data/interceptor';

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