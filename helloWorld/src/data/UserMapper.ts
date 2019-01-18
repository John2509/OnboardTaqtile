import { IUser } from "../domain/IUser";

export default class UserMapper {
    static mapForUser(data: any): IUser {
      var user : IUser = {
        email: data.data.data.email,
        username: data.data.data.name,
        id: data.data.data.id,
        role: data.data.data.role
      };
      return user;
    };
  
    static mapForUserList(data: any): IUser[]{
      var users :IUser[] = [];
      data.data.data.forEach((user : any) => {
        var x : IUser = {
          email: user.email,
          username: user.name,
          id: user.id,
          role: user.role
        };
        users.push(x);
      });
      return users;
    };
  
    static mapForUserAndToken(data: any): {user: IUser, token: string}{
      var user : IUser = {
        email: data.data.data.user.email,
        username: data.data.data.user.name,
        id: data.data.data.user.id,
        role: data.data.data.user.role
      };
      var userAndToken = { 
        user: user,
        token: data.data.data.token
      }
      return userAndToken;
    }
  }