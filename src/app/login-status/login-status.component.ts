import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName!: string;

  constructor(
    private router: Router,
    private oktaAuthStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) { }

  ngOnInit(): void {
    this.oktaAuthStateService.authState$.subscribe(result => {
      this.oktaAuthStateService.authState$.subscribe(result=>{
        this.isAuthenticated = result.isAuthenticated || false;
      });

      this.getUserDetails();
    })
  }

  getUserDetails() {
    if(this.isAuthenticated) {
      // fetch the logged in user details (user's claims)
      // user full name is exposed as a property name
      this.oktaAuth.getUser().then(user=>{
        this.userFullName = user.name || "N/A";
      })
    }
  }

  public async logout(): Promise<void> {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
  }

}
