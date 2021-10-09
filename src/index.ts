import Harvest from 'harvest';

if (!process.env.HARVEST_ACCESS_TOKEN)
  throw new Error('Environment variable "HARVEST_ACCESS_TOKEN" is not defined')

if (!process.env.HARVEST_ACCOUNT_ID)
  throw new Error('Environment variable "HARVEST_ACCOUNT_ID" is not defined')

const harvest = new Harvest({
  subdomain: '',
  userAgent: 'x-report',
  concurrency: 1,
  auth: {
    accessToken: process.env.HARVEST_ACCESS_TOKEN,
    accountId: process.env.HARVEST_ACCOUNT_ID
  }
});

harvest.company
  .get()
  .then((response) => {
    const company = response;
    console.log(company)
  });
