import { Schema, model, models, Document } from "mongoose";

// Define the interface for the main document
export interface IUser extends Document {
  creator: string;
  description: string;
  walletAddress: string;
  profileImg: string;
  isCreator: boolean;
}

// Define the schema for the main document
const UserSchema: Schema = new Schema({
  creator: { type: String, required: true },
  description: { type: String, default: "" },
  walletAddress: { type: String, required: true, unique: true },
  profileImg: { type: String, default: "" },
  isCreator: { type: Boolean, default: false },
});

// Create and export the model
const User = models.User || model<IUser>("User", UserSchema);
export default User;
