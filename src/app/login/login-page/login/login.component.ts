import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public required = false
  public isLoggedin = false
  public user = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private loginService: LoginService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.user.status !== 'INVALID') {
      this.isLoggedin = true
      console.log('user detail', this.user.value);
      console.log(this.isLoggedin);
      this.router.navigate(['admin/'])
    } else {
      // this.snackbar.open('Please full-fill form !','ok',{duration:2000})
      console.log('form is invalid');
      this.required = true
    }

  }



}
