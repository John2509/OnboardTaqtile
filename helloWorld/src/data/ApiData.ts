import Axios from "axios";

export class ApiData {
  private static baseURL = 'https://tq-template-server-sample.herokuapp.com/'

  async login(email: string, password: string, rememberMe: boolean): Promise<any> {
    return Axios.post(ApiData.baseURL + 'authenticate/', {
      email: email,
      password: password,
      rememberMe: rememberMe
    });
  }

  async creatUser(name: string, password: string, email: string, role: string, token: string): Promise<any> {
    return Axios.post(ApiData.baseURL + 'users/', {
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
  }

  async getUser(userId: number, token: string): Promise<any>{
    return Axios.get(ApiData.baseURL + `users/${userId}` , {
      headers: {
        Authorization: token,
      }
    });
  }

  async editUser(userId: number, name: string, email: string, role: string, token: string): Promise<any> {
    return Axios.put(ApiData.baseURL + `users/${userId}`,
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
  }

  async getUserList(page: number, window: number, token: string): Promise<any> {
    return Axios.get(ApiData.baseURL + 'users', {
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
  }
}