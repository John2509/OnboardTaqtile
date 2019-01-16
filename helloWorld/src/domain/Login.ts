import { ApiData } from "../data/ApiData";
import { LocalData } from "../data/LocalData";
import { KEYS } from "../data/config";
import Navigation from "../core/navigation";

export default class Login {
  apiData: ApiData;
  localData: LocalData;
  
  constructor() {
    this.apiData = new ApiData();
    this.localData = new LocalData();
  }

  async loginRequest(email: string, password: string, rememberMe: boolean): Promise<any> {
    var self = this;
    
    try {
      var response = await this.apiData.login(email, password, rememberMe);
      self.localData.set(KEYS.USER_KEY, response.data.data.user.name);
      self.localData.set(KEYS.TOKEN_KEY, response.data.data.token);
      Navigation.goHome();
      return Promise.resolve(response.data.data.user.name);
    }
    catch (error) {
      if (error.response) {
        var totalError = '';
        error.response.data.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        return Promise.reject(totalError);
      }
      else {
        return Promise.reject('Error');
      }
    }
  };

}