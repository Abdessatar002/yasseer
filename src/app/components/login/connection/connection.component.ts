import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';
import { User } from '../user';
declare var $: any;


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  loading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.loading = true;
    this.loginService.loginTest(form.value).subscribe(data => {
        this.loginService.setTokenToLocalStorage(data.token);
        this.loginService.setUserToLocalStorage(data);
        this.loginService.loggedInUser.next(data.subject)
        this.router.navigate(['home']);
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      if (error.error.message)
        Swal.fire(error.error.message, '', 'warning');
      else  Swal.fire('Error !! ', '', 'warning');
      this.loginService.logOut();
    })
  }

}
