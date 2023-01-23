import { UserToken } from "./UserToken";


export interface User {
    username: string;
    firstName: string;
    lastLoggedIn: Date;
    familyName: string;
    created: Date;
    title: string;
    token: UserToken;
}