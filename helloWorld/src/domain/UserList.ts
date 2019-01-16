import { IUser } from "./IUser";
import Navigation from "../core/navigation";
import { KEYS } from "../data/config";
import { LocalData } from "../data/LocalData";
import { ApiData } from "../data/ApiData";

export default class UserList {
  localData: LocalData;
  apiData: ApiData;

  constructor() {
    this.localData = new LocalData();
    this.apiData = new ApiData();
  }

  onChangeUser(list: Array<IUser>, editedUser: IUser, index: number) : Array<IUser>{
    list[index] = editedUser;
    return list;
  };

  openUserCreate() {
    Navigation.showModal('UserCreate');
  };

  openUserDetails(userId: number, onChangeUser: {(editedUser: IUser): void}) {
    Navigation.showModal('UserDetails', {userId: userId, onChangeUser: (editedUser: IUser) => onChangeUser(editedUser)});
  }

  async getData(page: number, window: number, list: Array<IUser>) : Promise<IUser[] | string> {
    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      var users = await this.apiData.getUserList(page, window, token);
      users.forEach((user: IUser) => {
        list.push(user);
      });
      return Promise.resolve(list);
    } catch (error) {
      return Promise.reject("Error");
    }
  }
}