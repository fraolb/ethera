import { Schema, model, models, Types } from "mongoose";
import { IUser } from "./creator";

export interface IContent extends Document {
  _id: string;
  createdBy: IUser;
  walletAddress: string;
  title: string;
  description: string; // Fix the typo here
  contentType: "blog" | "video" | "image";
  tier: "standard" | "premium" | "vip";
  likes: number;
  contentLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema(
  {
    createdBy: {
      creator: {
        type: String,
      },
      description: {
        type: String,
      },
      walletAddress: {
        type: String,
      },
      profileImg: {
        type: String,
      },
      isCreator: {
        type: String,
      },
    },
    walletAddress: { type: String, required: true },
    title: { type: String, required: true },
    descrption: { type: String, default: "" },
    contentType: {
      type: String,
      enum: ["blog", "video", "image"],
      required: true,
    },
    tier: { type: String, required: true },
    likes: { type: Number, default: 0 },
    contentLink: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the model
const Content = models.Content || model<IContent>("Content", ContentSchema);
export default Content;
