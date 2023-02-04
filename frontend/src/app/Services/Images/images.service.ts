import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }


  //I don't need this
  public getImage(imageName: string){
    return this.http.get(`https://localhost:7103/api/Image/${imageName}`)
  }

  public uploadImage(uploadData:FormData){
    return this.http.post("https://localhost:7103/api/Image/", uploadData);
  }
}
