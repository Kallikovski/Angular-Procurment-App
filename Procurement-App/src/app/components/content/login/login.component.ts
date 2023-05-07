import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';

/** Page for user login and registration */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** Data structure for userlogin */
  public userLoginForm = new FormGroup({
    name: new FormControl(''),
    postcode: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl(''),
  });

  /** Role of the user */
  public role: string = "Customer";
  /** Possible roles of the user */
  public roles: string[] = ['Customer', 'Staff', 'Admin'];

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /** Send user values to authentication service for verification */
  public loginUser(): void {
    // Logic to update the user will go here, but for now, we'll just log the values
    this._auth.loginUser({ email: this.userLoginForm.controls.email.value, password: this.userLoginForm.controls.password.value }).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
        this._snackBar.open("Password or email wrong!");
      }
    )
  }
  /** Registration method */
  public registerUser(): void {
    // Logic to update the user will go here, but for now, we'll just log the values
    console.log(this.userLoginForm.controls)
    console.log(this.role)
    this._auth.registerUser(
      {
        email: this.userLoginForm.controls.email.value,
        password: this.userLoginForm.controls.password.value,
        username: this.userLoginForm.controls.name.value,
        postcode: this.userLoginForm.controls.postcode.value,
        city: this.userLoginForm.controls.city.value,
        street: this.userLoginForm.controls.street.value,
        role: this.role
      }).subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
          this._snackBar.open("Something went wrong pls try again!");
        }
      )
  }
}
