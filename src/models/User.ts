import mongoose, { Schema, Document, Model } from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

export interface IUser extends Document {
  name: string;
  email: string;
  googleId?: string;
  microsoftId?: string;
  googleAccessToken?: string;
  microsoftAccessToken?: string;
  googleRefreshToken?: string;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  microsoftId: { type: String },
  googleAccessToken: { type: String },
  microsoftAccessToken: { type: String },
  googleRefreshToken: { type: String },
});

userSchema.plugin(findOrCreate);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
