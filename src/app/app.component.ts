import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet1 Coffee';
  
  //currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
       // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  
  
  
  logout() {
        this.authenticationService.logout();
		console.log("Logout Message  Composant");
        this.router.navigate(['/login']);
    }
}
