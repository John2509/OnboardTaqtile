import { IUser } from "./User/IUser";
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

  openUserDetails(userId: number, onChangeUser: {(editedUser: IUser): void}) {
    Navigation.showModal('UserDetails', {userId: userId, onChangeUser: (editedUser: IUser) => onChangeUser(editedUser)});
  }

  async getData(page: number, window: number, list: Array<IUser>) : Promise<{list: IUser[], page: number} | string> {
    try {
      const token = await this.localData.get(KEYS.TOKEN_KEY);
      var res = await this.apiData.getUserList(page, window, token);
      res.list.forEach((user: IUser) => {
        list.push(user);
      });
      var newPage = page;
      if (page !== res.totalPages){
        newPage++;
      }
      return Promise.resolve({list: list, page: newPage});
    } catch (error) {
      return Promise.reject("Error");
    }
  }
}