import { Server as httpServer, createServer } from "http";
import express from 'express';
import cors from "cors";
import compression from "compression";
import config from "./config";

import { Server as ioServer, Socket } from 'socket.io';
import { ChatEvent } from "./chat/constant";
import { ChatMessage } from "./chat/chatMessage";

import { mongo } from "./db/mongoose";
import { UserRoutes } from "./routes/userRouter";
import { ProductRoutes } from "./routes/productRouter"
import { OrderRoutes } from "./routes/orderRouter"

/** Main class for running express and all related services */
class Server {
  public server: httpServer;
  public app: express.Application;
  private io: ioServer;
  private ioccounter = 0;


  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.config();
    this.io = new ioServer(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      }
    });
    this.initSocket();
    this.routes();
    mongo();
  }

  /** Defines server and express configurations */
  public config(): void {
    this.app.use(express.json());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: '*',
      credentials: true,
      optionsSuccessStatus: 200
    }));
  }

  /** Initilizing chat socket with all related events*/
  public initSocket() {
    this.io.on(ChatEvent.CONNECT, (socket: Socket) => {
      console.log('Connected Websocekt IO client on port %s.', this.app.get("port"));
      this.ioccounter++;
      this.io.emit('iocounter', { counter: this.ioccounter });
      console.log("Number of websocket connections: ", this.ioccounter);

      socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
        console.log('[server](message):', JSON.stringify(m));
        this.io.emit('message', { author: m.author, message: m.message });
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        this.ioccounter--;
        this.io.emit('iocounter', { counter: this.ioccounter });
        console.log('Client disconnected');
      });
    });
  }

  /** Sets up routes for express*/
  public routes(): void {
    this.app.use("/", new UserRoutes().router);
    this.app.use("/", new ProductRoutes().router);
    this.app.use("/", new OrderRoutes().router);
  }

  /** Starts server with constants defined in config.ts */
  public start(): void {
    this.server.listen(config.server.port, () => {
      console.log(`Server is running on ${config.server.hostname}:${config.server.port}`);
    });
  }
}
const server = new Server();
server.start();



