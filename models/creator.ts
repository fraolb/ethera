import { Schema, model, models, Document } from "mongoose";

// Define the interface for the main document
export interface IUser extends Document {
  creator: string;
  walletAddress: string;
  isCreator: boolean;
}

// Define the schema for the main document
const UserSchema: Schema = new Schema({
  creator: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  isCreator: { type: Boolean, default: false },
});

// Create and export the model
const User = models.User || model<IUser>("User", UserSchema);
export default User;
