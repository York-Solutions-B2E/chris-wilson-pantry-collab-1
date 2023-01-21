import { UserToken } from "./UserToken";


export interface User {
    Username: string;
    FirstName: string;
    LastLoggedIn: Date;
    FamilyName: string;
    Created: Date;
    Title: string;
    Token: UserToken;
}