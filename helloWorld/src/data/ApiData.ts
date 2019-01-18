import Axios from "axios";
import { IUser } from "../domain/IUser";

export class ApiData {
  private static baseURL = 'https://tq-template-server-sample.herokuapp.com/'

  async login(email: string, password: string, rememberMe: boolean): Promise<{user:IUser, token: string}> {
    var res = await Axios.post(ApiData.baseURL + 'authenticate/', {
      email: email,
      password: password,
      rememberMe: rememberMe
    });
    var user : IUser = {
      email: res.data.data.user.email,
      username: res.data.data.user.name,
      id: res.data.data.user.id,
      role: res.data.data.user.role
    };
    var userToke = { 
      user: user,
      token: res.data.data.token
    }
    return userToke
  }

  async createUser(name: string, password: string, email: string, role: string, token: string): Promise<IUser> {
    var res = await Axios.post(ApiData.baseURL + 'users/', {
      name: name,
      password: password,
      email: email,
      role: role
    },{
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    var user : IUser = {
      email: res.data.data.email,
      username: res.data.data.name,
      id: res.data.data.id,
      role: res.data.data.role
    };
    return user;
  }

  async getUser(userId: number, token: string): Promise<IUser>{
    var res = await Axios.get(ApiData.baseURL + `users/${userId}` , {
      headers: {
        Authorization: token,
      }
    });
    var user : IUser = {
      email: res.data.data.email,
      username: res.data.data.name,
      id: res.data.data.id,
      role: res.data.data.role
    };
    return user;
  }

  async editUser(userId: number, name: string, email: string, role: string, token: string): Promise<IUser> {
    var res = await Axios.put(ApiData.baseURL + `users/${userId}`,
    {
      name: name,
      email: email,
      role: role
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });
    var user : IUser = {
      email: res.data.data.email,
      username: res.data.data.name,
      id: res.data.data.id,
      role: res.data.data.role
    };
    return user;
  }

  async getUserList(page: number, window: number, token: string): Promise<IUser[]> {
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
    var users : IUser[] = [];
    res.data.data.forEach((user : any) => {
      var x : IUser = {
        email: user.email,
        username: user.name,
        id: user.id,
        role: user.role
      };
      users.push(x);
    });
    return users;
  }
}