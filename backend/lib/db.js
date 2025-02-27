    
  import mongoose from "mongoose";
  
  export const connectDB = (uri: string) =>
    mongoose
      .connect(uri, { dbName: "undefined" })
      .then((c) => {
        console.log(`Connected with ${c.connection.name}`);
      })
      .catch((e) => console.log(e));
  
  