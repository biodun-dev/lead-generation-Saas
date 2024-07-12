import express from 'express';
import passport from 'passport';
import { loginSuccess, loginFailure } from '../controllers/authController';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), loginSuccess);
router.get('/microsoft', passport.authenticate('microsoft', { scope: ['user.read'] }));
router.get('/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/login', session: false }), loginSuccess);
router.get('/failure', loginFailure);

export default router;
