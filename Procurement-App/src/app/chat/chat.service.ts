import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthService } from 'src/app/auth/auth.service'
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';

/** Service for handeling the staff member chat socket*/
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socketObserver: BehaviorSubject<Socket | undefined>;
  private socket: Socket | undefined;
  private _socketUrl = "http://localhost:3000";
  loggedIn = false
  userName: string | undefined = undefined
  userRole: string | undefined = undefined
  staffMembersOnline: number | undefined = undefined

  /** Initializing socket observable*/
  constructor(private _auth: AuthService, private _userService: UserService) {
    this.socketObserver = new BehaviorSubject<Socket | undefined>(undefined);
    this.socketObserver.subscribe((socket?: Socket) => { this.socket = socket });
  }

  /** Function for initializing the chat socket*/
  initSocket(): void {
    this._auth.getIsLoggedInObserver().subscribe((data: any) => {
      this.loggedIn = data;
      if (this.loggedIn) {
        this._userService.getUser().subscribe(async (data: any) => {
          this.userRole = data.role;
          this.userName = data.username;
          if (this.userRole === "Staff") {
            this.socketObserver.next(io(this._socketUrl).connect());
          }
        }) // Check if user has the correct role.
      }
    }) // Check if a user is logged in.
  }
  /** Function for emiting the message event*/
  sendMessage(data: any): void {
    this.socket?.emit('message', { author: this.userName, message: data })
  }

  /** Function for returning a observable, which listens to the message event*/
  getMessageObservable(): Observable<any> {
    console.log("getMessage()")
    return new Observable<{ message: string }>(observer => {
      console.log(this.socket);
      this.socket?.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket?.disconnect();
      }
    })
  }

  /** Function for returning a staff member counter observable, which listens to the 'iocounter' event*/
  getSocketCounterObservable(): Observable<any> {
    console.log("getSocketCount()")
    return new Observable<{ counter: number }>(observer => {
      console.log(this.socket);
      this.socket?.on('iocounter', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket?.disconnect();
      }
    })
  }

  /** Function for disconnecting the staff member socket*/
  disconnect() {
    console.log("socket.disconnect()")
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
