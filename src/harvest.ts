import axios, { AxiosInstance } from 'axios';
import { HarvestReport } from './harvestTypes';
import { Report } from './report';

export default class Harvest {
  private readonly accessToken: string;
  private readonly accountId: string;
  private axiosInstance: AxiosInstance;

  constructor(accessToken: string, accountId: string) {
    this.accessToken = accessToken;
    this.accountId = accountId;

    this.axiosInstance = axios.create({
      baseURL: 'https://api.harvestapp.com/api/v2',
      headers: {
        'User-Agent': 'x-report',
        'Authorization': `Bearer ${this.accessToken}`,
        'Harvest-Account-Id': this.accountId,
        'Content-Type': 'application/json'
      }
    });
  }

  async getCurrentWeek(): Promise<Report> {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();

    const from = new Date(curr.setDate(first + 1)).toISOString().slice(0, 10);
    const to = new Date(curr.setDate(first + 5)).toISOString().slice(0, 10);

    return this.axiosInstance.get<HarvestReport>(`/time_entries?from=${from}&to=${to}`)
      .then((response) => {
        return Promise.resolve(Report.parseHarvest(from, to, response.data));
      })
      .catch((err) => {
        return Promise.reject({
          status: err.response.status,
          message: err.response.statusText
        });
      })
  }
}
