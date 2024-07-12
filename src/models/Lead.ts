import mongoose, { Schema, Document } from 'mongoose';

interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  website?: string;
  score?: number;
  owner: mongoose.Schema.Types.ObjectId; // Reference to the User model
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: String },
    position: { type: String },
    website: { type: String },
    score: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Lead = mongoose.model<ILead>('Lead', leadSchema);
export default Lead;
