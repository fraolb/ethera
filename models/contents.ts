import { Schema, model, models } from "mongoose";

export interface IContent extends Document {
  createdBy: string;
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
    createdBy: { type: String, required: true },
    title: { type: String, required: true },
    descrption: { type: String, default: "" },
    contentType: {
      type: String,
      enum: ["blog", "vid", "image"],
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
