import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'MICROSOFT_CLIENT_ID',
  'MICROSOFT_CLIENT_SECRET'
];

const validateEnv = () => {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(`Error: Missing required environment variable ${envVar}`);
      process.exit(1);
    }
  });

  console.log('All required environment variables are set.');
};

export { validateEnv };
