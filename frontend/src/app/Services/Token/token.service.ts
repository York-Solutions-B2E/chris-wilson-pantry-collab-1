import { Injectable } from '@angular/core';
import { TokenDTO } from 'src/app/dto/TokenDTO';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _Token: string = ""; 

  constructor() { }


    /**
     * Getter $token
     * @return {string }
     */
	public get $token(): string  {
		return this._Token;
	}

  public setToken(t: TokenDTO){
      //save in local storage
      localStorage.setItem("token", t.Token); 
      localStorage.setItem("token_exp", t.Exp)
  }


}
