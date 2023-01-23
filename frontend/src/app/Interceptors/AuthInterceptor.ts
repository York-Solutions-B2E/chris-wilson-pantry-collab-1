import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/Authtication/authentication.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService){

    }


    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        //get token
        let currentUser = this.authService.currentUserValue; 

        //check if there is a token
        if (currentUser && currentUser.token && currentUser.token.value) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + currentUser.token.value)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}