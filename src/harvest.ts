export interface Config {
  debug?: boolean;
  accessToken: string;
  accountId: string;
}

export default class Harvest {
  userAgent: string = 'x-report';
  debug: boolean;
  private accessToken: string;
  private accountId: string;

  constructor(config: Config) {
    this.debug = config.debug || false;
    this.accessToken = config.accessToken;
    this.accountId = config.accountId;
  }
}
