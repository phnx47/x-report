import Harvest from './harvest';

if (!process.env.HARVEST_ACCESS_TOKEN)
  throw new Error('Environment variable "HARVEST_ACCESS_TOKEN" is not defined')

if (!process.env.HARVEST_ACCOUNT_ID)
  throw new Error('Environment variable "HARVEST_ACCESS_TOKEN" is not defined')

const harvest = new Harvest({
  accessToken: process.env.HARVEST_ACCESS_TOKEN,
  accountId: process.env.HARVEST_ACCOUNT_ID
});
