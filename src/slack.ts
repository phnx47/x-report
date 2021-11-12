import axios, { AxiosInstance } from "axios";

export default class Slack {
  private webhookUrl: string
  private axiosInstance: AxiosInstance;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
    this.axiosInstance = axios.create({
      headers: {
        'User-Agent': 'x-report',
        'Content-Type': 'application/json'
      }
    });
  }

  push(text: string) {
    const options = {
      text: text
    };
    this.axiosInstance.post(this.webhookUrl, JSON.stringify(options))
      .then((response) => {
        console.log("Slack Response: " + response.data);
      })
      .catch((err) => {
        console.error(err)
      });
  }
}


