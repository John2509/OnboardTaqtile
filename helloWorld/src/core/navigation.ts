import { Navigation as Navi } from 'react-native-navigation'

export default class Navigation {
  public static goToAuth = () => Navi.setRoot({
    root: {
      component: {
        name: 'Login',
      },
    },
  });

  public static goHome = () => Navi.setRoot({
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

  public static pushScreen = (componentId: any, componentName: string) => Navi.push(
    componentId, {
    component: {
      name: componentName,
    }
  });

  public static popScreen = (compontId: any) => Navi.pop(
    compontId
  );

  public static showModal = (componentName: string, props?:{}) => Navi.showModal({
    component: {
      name: componentName,
      passProps: props,
    }
  });

  public static dismissModal = (componentId: any) => Navi.dismissModal(componentId);

  public static dismissAllModals = () => Navi.dismissAllModals();
};
