import { KEYS } from "../data/config";
import { LocalData } from "../data/LocalData";
import { ApiData } from "../data/ApiData";
import Navigation from "../core/navigation";
import { IUser } from "./IUser";

export default class UserCreate {
  localData: LocalData;
  apiData: ApiData;

  constructor() {
    this.localData = new LocalData();
    this.apiData = new ApiData();
  };

  close(componentId: any) {
    Navigation.popScreen(componentId);
  };

  async createRequest(name: string, password: string, email: string, role: string): Promise<IUser | string> {
    const token = await this.localData.get(KEYS.TOKEN_KEY);

    try {
      var user = await this.apiData.createUser(name, password, email, role, token);
      return Promise.resolve(user);
    } catch (error) {
      if (error.response) {
        var totalError = '';
        error.response.data.errors.forEach(function (error: any) {
          totalError += error.message + '\n';
        });
        return Promise.reject(totalError);
      }
      else {
        return Promise.reject("Error");
      }
    }
  };
}