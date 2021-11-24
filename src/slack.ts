import axios from 'axios';

export default class Slack {
  private webhookUrl: string

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  push(text: string) {
    const options = {
      text: text
    };
    axios.post(this.webhookUrl, JSON.stringify(options))
      .then((response) => {
        console.log('Slack Response: ' + response.data);
      })
      .catch((err) => {
        console.error(err)
      });
  }
}


