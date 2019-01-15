import axios from 'axios';
import { goToAuth } from '../core/navigation';
import { Alert } from 'react-native';
import { KEYS } from './config';
import { Navigation } from 'react-native-navigation';
import { LocalData } from './LocalData';

export function addInterceptor (){
  axios.interceptors.request.use(
    function (config) {
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
        var localData = new LocalData();
        localData.remove(KEYS.USER_KEY);
        localData.remove(KEYS.TOKEN_KEY);
        Navigation.dismissAllModals();
        goToAuth();
        Alert.alert("Por Favor, faça o login novamente");
      };
      return Promise.reject(error);
  });
}