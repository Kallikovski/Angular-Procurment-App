import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user/user.service';

/* Page with all user data*/
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updating = false;
  updatingPassword = false;

  update = {
    username: "",
    postcode: "",
    city: "",
    street: "",
    email: ""
  }

  passwordUpdate = {
    password: "",
    repeatPassword: ""
  }

  user = {
    username: "---",
    postcode: "---",
    city: "---",
    street: "---",
    email: "---",
    role: "---"
  }
  constructor(private _userService: UserService, private _snackBar: MatSnackBar) {
    this.getUser();
  }
  ngOnInit(): void { }

  /* Returns the user information */
  getUser() {
    this._userService.getUser().subscribe(
      res => {
        this.user = { ...res }
        this.update = {
          username: this.user.username,
          postcode: this.user.postcode,
          city: this.user.city,
          street: this.user.street,
          email: this.user.email,
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  /* Updates the user information */
  updateUser() {
    console.log(this.update);
    this._userService.updateUser(this.update).subscribe(
      res => {
        this.getUser();
        this.updating = false;
      },
      err => {
        console.log(err);
        this._snackBar.open("Something went wrong!");
      }
    )
  }

  /* Updates the password of a user */
  updateUserPassword() {
    console.log(this.update);
    if (this.passwordUpdate.password.length >= 8) {
      if (this.passwordUpdate.password == this.passwordUpdate.repeatPassword) {
        this._userService.updateUser({ password: this.passwordUpdate.password }).subscribe(
          res => {
            this.updatingPassword = false;
          },
          err => {
            console.log(err);
            this._snackBar.open("Something went wrong!");
          }
        )
      }
      else {
        this._snackBar.open("Password not identical!");
      }
    }
    else {
      this._snackBar.open("Your password should be longer!");
    }
  }
}
