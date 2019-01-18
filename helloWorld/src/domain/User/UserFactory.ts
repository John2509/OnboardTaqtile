import { IUser } from "./IUser";

export default class UserFactory {
    static makeUser(name: string, email: string, role: string, id?: number): IUser{
        var user: IUser ={
            username: name,
            email: email,
            role: role,
            id: 0
        };
        if (id){
            user.id = id;
        }
        return user;
    }
}