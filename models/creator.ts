import { Schema, model, models, Document } from "mongoose";

// Define the interface for the content subdocument
interface IContent {
  title: string;
  contentType: "blog" | "video" | "image";
  tier: string;
  likes: number;
  contentLink: string;
}

// Define the interface for the main document
interface IUser extends Document {
  creator: string;
  walletAddress: string;
  isCreator: boolean;
  contents: IContent[];
}

// Define the schema for the content subdocument
const ContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  contentType: { type: String, enum: ["blog", "vid", "image"], required: true },
  tier: { type: String, required: true },
  likes: { type: Number, default: 0 },
  contentLink: { type: String },
});

// Define the schema for the main document
const UserSchema: Schema = new Schema({
  creator: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  isCreator: { type: Boolean, default: false },
  contents: { type: [ContentSchema], default: [] },
});

// Create and export the model
const User = models.User || model<IUser>("User", UserSchema);
export default User;
