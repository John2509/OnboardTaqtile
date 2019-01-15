import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/presentation/screens';
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