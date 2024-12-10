 import mongoose from "mongoose";

 const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
      console.log("mongodb is Already Connected!");
      return;
    }
    try {
      await mongoose.connect("mongodb+srv://hkhawar242:hkhawar1122@cluster01.lb15w.mongodb.net/");
      console.log("Mongodb is Now Connected");
    } catch (error) {
      console.log(error, "Error From Mongodb Connection Error");
    }
  };
  export default dbConnect;