import axios from 'axios';
import { goToAuth } from '../scr/navigation';
import { Alert, AsyncStorage } from 'react-native';
import { USER_KEY, TOKEN_KEY } from './config';
import { Navigation } from 'react-native-navigation';

export function addInterceptor (){
  axios.interceptors.request.use(
    function (config) {
      //console.log(config.headers.Authorization);
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      if(error.response.data.errors[0].original == "Jwt token is expired"){
        AsyncStorage.removeItem(USER_KEY);
        AsyncStorage.removeItem(TOKEN_KEY);
        Navigation.dismissAllModals();
        goToAuth();
        Alert.alert("Por Favor, faça o login novamente");
      };
      return Promise.reject(error);
  });
}