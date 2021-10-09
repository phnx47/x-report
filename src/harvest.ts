import axios, { AxiosInstance } from 'axios';

export interface Config {
  debug?: boolean;
  accessToken: string;
  accountId: string;
}

export default class Harvest {
  debug: boolean;
  private accessToken: string;
  private accountId: string;
  private axiosInstance: AxiosInstance;

  constructor(config: Config) {
    this.debug = config.debug || false;
    this.accessToken = config.accessToken;
    this.accountId = config.accountId;

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

  getCurrentWeek() {
    var curr = new Date;
    var first = curr.getDate() - curr.getDay();

    var firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastDay = new Date(curr.setDate(first + 6))

    var from = firstDay.toISOString().slice(0, 10).replaceAll('-', '');
    var to = lastDay.toISOString().slice(0, 10).replaceAll('-', '')

    this.axiosInstance.get(`/time_entries?from=${from}&to=${to}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
