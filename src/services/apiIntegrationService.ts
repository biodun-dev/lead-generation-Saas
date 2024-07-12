import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../config/logger';

dotenv.config();

const linkedInAPIBaseURL = 'https://api.linkedin.com/v2';

const getAccessToken = async () => {
  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
    });

    return response.data.access_token;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error obtaining LinkedIn access token: ${error.message}`);
      throw new Error('Failed to obtain LinkedIn access token');
    } else {
      logger.error('An unknown error occurred while obtaining LinkedIn access token');
      throw new Error('An unknown error occurred while obtaining LinkedIn access token');
    }
  }
};

export const fetchLeadDataFromLinkedIn = async (leadId: string) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${linkedInAPIBaseURL}/people/(id:${leadId})`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching lead data from LinkedIn: ${error.message}`);
      throw new Error('Failed to fetch lead data from LinkedIn');
    } else {
      logger.error('An unknown error occurred while fetching lead data from LinkedIn');
      throw new Error('An unknown error occurred while fetching lead data from LinkedIn');
    }
  }
};
