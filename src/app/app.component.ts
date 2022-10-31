import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {LoginService} from "./components/login/login.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent  implements OnInit{
  title = 'yasseer-front';
  display: boolean = false;

  constructor(private loginService: LoginService) { }
  getTransaction(){
    this.loginService.getTransaction().subscribe(data => {
      console.log(data);
    },(error:HttpErrorResponse)=>{
      console.log(error)
    })}
  ngOnInit(): void {}



}
