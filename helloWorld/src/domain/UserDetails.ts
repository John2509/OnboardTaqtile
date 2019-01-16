import Navigation from "../core/navigation";
import { KEYS } from "../data/config";
import { LocalData } from "../data/LocalData";
import { ApiData } from "../data/ApiData";
import { IUser } from "./IUser";

export default class UserDetails {
  localData: LocalData;
  apiData: ApiData;

  constructor() {
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  close(componentId: any, editedUser?: IUser, onChangeUser?: (editedUser: IUser) => void) {
    if (editedUser && onChangeUser)
      onChangeUser(editedUser);
    Navigation.dismissModal(componentId);
  };

  async sendEdit(userId: number, name: string, email: string, role: string) : Promise<String> {
    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      await this.apiData.editUser(userId, name, email, role, token);
      return Promise.resolve("Edição feita com sucesso!")
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

  async getData(userId: number) : Promise<IUser | void>{
    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      var response = await this.apiData.getUser(userId, token);
      var user = {
        id: userId,
        email: response.data.data.email,
        username: response.data.data.name,
        role: response.data.data.role
      };
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject();
    }
  }
}
