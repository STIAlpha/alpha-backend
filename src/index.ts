import express from "express";
import { Express } from "express-serve-static-core";
import dotenv from "dotenv";
import { Database } from "./Database/db";
dotenv.config();

class Server {
  private app: Express;
  private db: Database;
  constructor() {
    this.app = express();
    this.runMiddleWare();
    this.db = new Database();
  }

  async start() {
    this.app.listen(process.env.PORT, () => {
      try {
        console.log(`Connected to port - ${process.env.PORT}`);
      } catch (error) {
        console.log(error);
      }
    });

    await this.db.connectDB(process.env.MONGO_URI);
  }

  private runMiddleWare() {
    this.app.use(express.json());
  }
}

const server = new Server();
server.start();
