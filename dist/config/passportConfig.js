"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_microsoft_1 = require("passport-microsoft");
const User_1 = __importDefault(require("../models/User"));
// Google OAuth strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_1.default.findOrCreate({ googleId: profile.id }, {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleAccessToken: accessToken,
        });
        done(null, result.doc);
    }
    catch (error) {
        done(error);
    }
})));
// Microsoft OAuth strategy
passport_1.default.use(new passport_microsoft_1.Strategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "/api/auth/microsoft/callback",
    scope: ["user.read"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_1.default.findOrCreate({ microsoftId: profile.id }, {
            name: profile.displayName,
            email: profile.emails[0].value,
            microsoftAccessToken: accessToken,
        });
        done(null, result.doc);
    }
    catch (error) {
        done(error);
    }
})));
// Serialize user
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
