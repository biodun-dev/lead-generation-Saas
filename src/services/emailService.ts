import nodemailer from 'nodemailer';
import User from '../models/User';

const sendPersonalizedEmail = async (lead: any, subject: string, content: string) => {
  const user = await User.findById(lead.owner);
  if (!user) {
    throw new Error('User not found');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: user.email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: user.googleRefreshToken,
      accessToken: user.googleAccessToken,
    },
  });

  const mailOptions = {
    from: user.email,
    to: lead.email,
    subject,
    text: content,
  };

  await transporter.sendMail(mailOptions);
};

export default {
  sendPersonalizedEmail,
};
