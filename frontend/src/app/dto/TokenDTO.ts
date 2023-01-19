import { ThisReceiver } from "@angular/compiler";


export class TokenDTO{
    public token: string; 
    public expires: string; 


	constructor(token: string, expires: string) {
        this.token = token; 
        this.expires = expires; 
	}

}