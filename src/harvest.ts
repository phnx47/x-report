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
  private axiosClient: AxiosInstance;

  constructor(config: Config) {
    this.debug = config.debug || false;
    this.accessToken = config.accessToken;
    this.accountId = config.accountId;

    this.axiosClient = axios.create({
      baseURL: 'https://api.harvestapp.com/api/v2',
      headers: {
        'User-Agent': 'x-report',
        'Authorization': `Bearer ${this.accessToken}`,
        'Harvest-Account-Id': this.accountId,
        'Content-Type': 'application/json'
      }
    });
  }
}
