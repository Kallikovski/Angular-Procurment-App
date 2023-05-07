import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service'
import { ChatService } from 'src/app/chat/chat.service';

/** Application navigation bar */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  loggedIn = false;

  /** Constructor to set available languages and default language
   * @param TranslateService
   * @param AuthService 
   */
  constructor(public translate: TranslateService, private _auth: AuthService, private _chatService: ChatService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
    translate.use('en');
    this._auth.getIsLoggedInObserver().subscribe((data: any) => { this.loggedIn = data })
  }

  ngOnInit(): void { }

  /** Logout user via authentication service */
  logout() {
    console.log("LOGOUT")
    this._auth.logoutUser().subscribe(
      res => {
        this._chatService.disconnect()
      },
      err => console.log(err)
    )
  }
  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }
  /** 
   * Switch language of the app 
   * @param lang new language to set
  */
  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
