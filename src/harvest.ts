import axios, { AxiosInstance } from 'axios';
import { Report, Task } from './report';

export interface Config {
  accessToken: string;
  accountId: string;
}

export default class Harvest {
  private accessToken: string;
  private accountId: string;
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
    //var curr = new Date();
    var curr = new Date('2021-10-09'); // for debug
    var first = curr.getDate() - curr.getDay();

    var from = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    var to = new Date(curr.setDate(first + 6)).toISOString().slice(0, 10);

    return this.axiosInstance.get<HarvestReport>(`/time_entries?from=${from}&to=${to}`)
      .then((response) => {
        const report: Report = {
          from: from,
          to: to,
          tasks: []
        };
        for (let i = 0; i < response.data.time_entries.length; i++) {
          const entry = response.data.time_entries[i];
          let hasTask = report.tasks.some(t => t['note'] === entry.notes)
          if (!hasTask) {
            report.tasks.push({
              note: entry.notes,
              type: entry.task.name
            });
          }
        }
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

interface IdName {
  id: number;
  name: string;
}

interface TimeEntry {
  id: number;
  spent_date: string;
  task: IdName;
  hours: number;
  hours_without_timer: number;
  rounded_hours: number;
  notes: string;
  created_at: Date;
  updated_at: Date;
  is_locked: boolean;
  locked_reason: string;
  is_closed: boolean;
  is_billed: boolean;
  timer_started_at?: any;
  started_time: string;
  ended_time: string;
  is_running: boolean;
  external_reference?: any;
  billable: boolean;
  budgeted: boolean;
  billable_rate?: number;
  cost_rate: number;
}


interface HarvestReport {
  time_entries: TimeEntry[];
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page?: any;
  previous_page?: any;
  page: number;
}
