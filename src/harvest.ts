import axios, { AxiosInstance } from 'axios';
import { HarvestReport } from './harvestReport';
import { Report } from './report';

export interface Config {
  accessToken: string;
  accountId: string;
}

export default class Harvest {
  private readonly accessToken: string;
  private readonly accountId: string;
  private axiosInstance: AxiosInstance;

  constructor(config: Config) {
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

  async getCurrentWeek(): Promise<Report> {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();

    const from = new Date(curr.setDate(first + 1)).toISOString().slice(0, 10);
    const to = new Date(curr.setDate(first + 5)).toISOString().slice(0, 10);

    return this.axiosInstance.get<HarvestReport>(`/time_entries?from=${from}&to=${to}`)
      .then((response) => {
        const report: Report = {
          from: from,
          to: to,
          tasks: []
        };
        response.data.time_entries.forEach((entry) => {
          const task = report.tasks.find(x => x.id === entry.task.id);
          if (!task) {
            report.tasks.push({
              id: entry.task.id,
              notes: [entry.notes],
              name: entry.task.name
            });
          } else {
            const hasNotes = task.notes.some(t => t === entry.notes)
            if (!hasNotes)
              task.notes.push(entry.notes);
          }
        });
        report.tasks = report.tasks.sort((a, b) => a.id - b.id)
        return Promise.resolve(report);
      })
      .catch((err) => {
        return Promise.reject({
          status: err.response.status,
          message: err.response.statusText
        });
      })
  }
}
