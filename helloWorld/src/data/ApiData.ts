import Axios from "axios";
import { IUser } from "../domain/User/IUser";
import UserMapper from "./UserMapper";

export class ApiData {
  private static baseURL = 'https://tq-template-server-sample.herokuapp.com/'

  async login(email: string, password: string, rememberMe: boolean): Promise<{user:IUser, token: string}> {
    var res = await Axios.post(ApiData.baseURL + 'authenticate/', {
      email: email,
      password: password,
      rememberMe: rememberMe
    });
    var userAndToken = UserMapper.mapForUserAndToken(res);
    return userAndToken
  }

  async createUser(createdUser: IUser, password: string, token: string): Promise<IUser> {
    var res = await Axios.post(ApiData.baseURL + 'users/', {
      name: createdUser.username,
      password: password,
      email: createdUser.email,
      role: createdUser.role
    },{
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    var user: IUser = UserMapper.mapForUser(res);
    return user;
  }

  async getUser(userId: number, token: string): Promise<IUser>{
    var res = await Axios.get(ApiData.baseURL + `users/${userId}` , {
      headers: {
        Authorization: token,
      }
    });
    var user: IUser = UserMapper.mapForUser(res);
    return user;
  }

  async editUser(editedUser: IUser, token: string): Promise<IUser> {
    var res = await Axios.put(ApiData.baseURL + `users/${editedUser.id}`,
    {
      name: editedUser.username,
      email: editedUser.email,
      role: editedUser.role
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    var user : IUser = UserMapper.mapForUser(res);
    return user;
  }

  async getUserList(page: number, window: number, token: string): Promise<{list: IUser[], totalPages: number}> {
    var res = await Axios.get(ApiData.baseURL + 'users', {
      params: {
        pagination: {
          page: page,
          window: window
        }
      },
      headers: {
        Authorization: token,
      }
    });
    var users : IUser[] = UserMapper.mapForUserList(res);
    return {list: users, totalPages: res.data.pagination.totalPages};
  }
}