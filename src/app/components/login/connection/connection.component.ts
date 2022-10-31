import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login.service';
import { User } from '../user';
import {MessageService} from "primeng/api";
declare var $: any;


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  loading: boolean = false;

  constructor(private loginService: LoginService,
              private router: Router,
              private notificationService: MessageService) { }

  ngOnInit(): void {
  }




  onLogin(form: NgForm) {
    this.loading = true;
    this.loginService.login(form.value).subscribe(data => {
      console.log(data)
        this.loginService.setTokenToLocalStorage(data.token);
        this.loginService.setUserToLocalStorage(data);
        this.loginService.loggedInUser.next(data)
        this.router.navigate(['home']);
        this.loading = false;
      this.notificationService.add({severity:'success' , summary:'login' , detail:'Hi '+ data.nom.toUpperCase()})

    }, (error: HttpErrorResponse) => {
      this.loading = false;
      if (error.error.message)
      this.notificationService.add({severity:'error' , summary:'Opps' , detail:error.error.message})
      else this.notificationService.add({severity:'error' , summary:'Error system' , detail:'Merci d\'essayer plus tard'})


      this.loginService.logOut();
      console.log(error);
    })
  }

}
