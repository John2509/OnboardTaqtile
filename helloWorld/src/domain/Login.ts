import { ApiData } from "../data/ApiData";
import { LocalData } from "../data/LocalData";
import { KEYS } from "../data/config";
import Navigation from "../core/navigation";
import { IUser } from "./User/IUser";

export default class Login {
  apiData: ApiData;
  localData: LocalData;
  
  constructor() {
    this.apiData = new ApiData();
    this.localData = new LocalData();
  }

  async loginRequest(email: string, password: string, rememberMe: boolean): Promise<IUser | string> {
    var self = this;
    
    try {
      var response = await this.apiData.login(email, password, rememberMe);
      self.localData.set(KEYS.USER_KEY, response.user.username);
      self.localData.set(KEYS.TOKEN_KEY, response.token);
      Navigation.goHome();
      return Promise.resolve(response.user);
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