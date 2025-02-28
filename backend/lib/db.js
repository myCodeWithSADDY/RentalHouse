    
 import mongoose from "mongoose";
 
 export const connectDB = (uri) =>
   mongoose
     .connect(uri, { dbName: "rentalHouse" })
     .then((c) => {
       console.log(`Connected with ${c.connection.name}`);
     })
     .catch((e) => console.log(e));
 
 export const giveCurrentDateTime = () => {
   const today = new Date();
   const date =
     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
   const time =
     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   const dateTime = date + " " + time;
   return dateTime;
 };
 