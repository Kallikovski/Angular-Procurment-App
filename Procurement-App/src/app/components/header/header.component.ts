import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

/* Header component which shows chat if the active user role is staff */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isStaffMember = false
  loggedIn = false;

  constructor(private _auth: AuthService) {
    this._auth.getIsLoggedInObserver().subscribe((data: any) => {
      this.loggedIn = data;
    })
    this._auth.getUserRoleObserver().subscribe((data: any) => {
      if (data == "Staff") {
        this.isStaffMember = true;
      }
      else {
        this.isStaffMember = false;
      }
    })
  }
  ngOnInit(): void { }
}
