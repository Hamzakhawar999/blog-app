import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Enter the name"],
      }, lastName: {
        type: String,
        required: [true, "Enter the Last name"],
      },
      email: {
        type: String,
        required: [true, "Enter the email"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Enter the password"],
      },
    },
    {
      timestamps: true,
    }
  );
   
  export default mongoose.models?.user || mongoose.model("user", userSchema);