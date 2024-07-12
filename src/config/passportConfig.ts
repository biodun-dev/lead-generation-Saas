require("dotenv").config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Profile as PassportProfile } from "passport";
import User, { IUser } from "../models/User";

type VerifyCallback = (error: any, user?: any, info?: any) => void;

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    
    async (
      accessToken: string,
      refreshToken: string,
      profile: PassportProfile,
      done: VerifyCallback
    ) => {
      try {
        const result = await User.findOrCreate(
          { googleId: profile.id },
          {
            name: profile.displayName,
            email: profile.emails![0].value,
            googleAccessToken: accessToken,
          }
        );
        done(null, result.doc);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Microsoft OAuth strategy
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      callbackURL: "/api/auth/microsoft/callback",
      scope: ["user.read"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: PassportProfile,
      done: VerifyCallback
    ) => {
      try {
        const result = await User.findOrCreate(
          { microsoftId: profile.id },
          {
            name: profile.displayName,
            email: profile.emails![0].value,
            microsoftAccessToken: accessToken,
          }
        );
        done(null, result.doc);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user: any, done: (err: any, id?: any) => void) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(
  async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
