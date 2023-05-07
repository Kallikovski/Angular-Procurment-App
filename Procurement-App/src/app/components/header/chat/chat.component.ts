import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ChatService } from 'src/app/chat/chat.service'

/** Chat component for staff member communication*/
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  opened: boolean = false;
  chat: string = "";
  message: string = "";
  staffMembersOnline: number = 0;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.initSocket()
    this.chatService.socketObserver.subscribe((socket: Socket | undefined) => {
      socket?.on("connect", () => {
        this.chatService.getMessageObservable().subscribe((data: { author: string, message: string }) => {
          this.writeMessage(data);
        });
        this.chatService.getSocketCounterObservable().subscribe((data: { counter: number }) => {
          this.staffMembersOnline = data.counter
        });
      })
    });
  }

  /** Submits the message to the chat service */
  submitMessage() {
    if (this.message !== "") {
      this.chatService.sendMessage(this.message);
      this.message = "";
    }
  }
  /** Adds the message to the chatwindow */
  writeMessage(data: any) {
    this.chat += '<p>' + data.author + ": " + data.message + '</p>';
  }

}
