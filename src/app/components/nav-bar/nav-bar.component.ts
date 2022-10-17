import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public display = false;

  constructor(public loginService: LoginService, private route: Router) { }

  loggedInUserUsername = '';
  ngOnInit(): void {
    this.loginService.loggedInUser.subscribe(data => {
      this.loggedInUserUsername = data?.login;
    })
  }
  displaySideBar() {
    this.display = !this.display;

    // if (this.display)
    //   this.display = false
    // else this.display = true;
  }
  public logOut() {
    this.loginService.logOut();
    this.route.navigate(['/login']);
    this.display = false;

  }

}
