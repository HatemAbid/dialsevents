import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
   // loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

  ngOnInit() {
	  this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
		
		 // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
	
  onSubmit() {
        
		this.submitted = true;
		
		// stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
		
		 console.log("Submit Login  successful : "+this.f.username.value);
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log("login successful : ");
                  console.log("login data is : "+ JSON.stringify(data));
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log("login Erreur : ");
                  console.log("login erreur is : "+ JSON.stringify(error));
                  //this.alertService.error(error);
                  //this.loading = false;
                });
		console.log("login Submit : ");		
    }
	
	logout() {
        this.authenticationService.logout();
		    console.log("Logout Message  Composant");
        this.router.navigate([this.returnUrl]);
    }
	

}