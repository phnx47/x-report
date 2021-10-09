import Harvest from './harvest';
import { Report } from './report';

if (!process.env.HARVEST_ACCESS_TOKEN)
  throw new Error('Environment variable "HARVEST_ACCESS_TOKEN" is not defined')

if (!process.env.HARVEST_ACCOUNT_ID)
  throw new Error('Environment variable "HARVEST_ACCOUNT_ID" is not defined')

const harvest = new Harvest({
  accessToken: process.env.HARVEST_ACCESS_TOKEN,
  accountId: process.env.HARVEST_ACCOUNT_ID
});


harvest
  .getCurrentWeek()
  .then((report: Report) => {
    let text = `From *${report.from}* To *${report.to}* \n\n`;
    report.tasks.forEach((task) => {
      text = text + task.typeName + ': ' + task.note + '\n';
    });
    console.log(text);
  })
  .catch((err) => {
    console.error(err)
  })

