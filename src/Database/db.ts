import mongoose from "mongoose";

export class Database {
  constructor() {}

  async connectDB(uri: any) {
    try {
      await mongoose
        .connect(uri)
        .then(() => console.log("Connected to DB"))
        .catch((err) => {
          console.log(`Error connecting to DB: ${err}`);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
