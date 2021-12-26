import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { Produit } from '../shared/produit';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private produitsUrl = 'https://www.cartemenu.tn/dialsevents/www2/produits.php';  // URL to web api
	//private userUrl = 'https://www.cartemenu.mobi/www2/api/login.php';  // URL to web api
  private userUrl = 'https://www.cartemenu.tn/dialsevents/www2/login.php';  // URL to web api
	private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


  constructor( private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	
	}
	
	public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
  
  login(email: string, password: string) {
        return this.http.post<any>(this.userUrl, { email, password})
            .pipe(map(data => {
				console.log("login Fonction Service : ");
                console.log('currentUser Data', JSON.stringify(data));
				// login successful if there's a jwt token in the response
                //if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                //    localStorage.setItem('currentUser', JSON.stringify(user));
                //    this.currentUserSubject.next(user);
                //}
				if (data && data.user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
					console.log('currentUser', JSON.stringify(data.user));
					this.currentUserSubject.next(data.user);
					console.log('currentUserSubject', this.currentUserSubject.value);
                    
                }

                return data;
            }));
    }
	
	logout() {
        // remove user from local storage to log user out
		console.log("Logout Message  Service");
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
		//this.router.navigate([this.returnUrl]);
    }
  
  
  /*login(username: string, password: string) {
        return this.http.post<any>(this.produitsUrl, { username, password })
            .pipe(map(user => {
				console.log("login successful : ");
                // login successful if there's a jwt token in the response
                //if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                //    localStorage.setItem('currentUser', JSON.stringify(user));
                //    this.currentUserSubject.next(user);
                //}

                return user;
            }));
    }*/
	
	
}
