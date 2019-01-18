import Navigation from "../core/navigation";
import { KEYS } from "../data/config";
import { LocalData } from "../data/LocalData";
import { ApiData } from "../data/ApiData";
import { IUser } from "./User/IUser";

export default class UserDetails {
  localData: LocalData;
  apiData: ApiData;

  constructor() {
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  async close(componentId: any, userId?: number, onChangeUser?: (editedUser: IUser) => void) {
    if (userId && onChangeUser){
      var editedUser = await this.getData(userId);
      if (!(typeof editedUser === "string")){
        onChangeUser(editedUser);
      }
    }
    Navigation.dismissModal(componentId);
  };

  async sendEdit(editedUser: IUser) : Promise<IUser | String> {

    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      var user = await this.apiData.editUser(editedUser, token);
      return Promise.resolve(user)
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
        return Promise.reject("Error")
      }
    }
  };

  async getData(userId: number) : Promise<IUser | string>{
    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      var user = await this.apiData.getUser(userId, token);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject("Error");
    }
  }
}
