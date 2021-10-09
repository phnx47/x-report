import axios, { AxiosInstance } from 'axios';
import { Task } from './task';

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

  async getCurrentWeek(): Promise<Task[]> {
    //var curr = new Date();
    var curr = new Date('2021-10-09'); // for debug
    var first = curr.getDate() - curr.getDay();

    var firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastDay = new Date(curr.setDate(first + 6))

    var from = firstDay.toISOString().slice(0, 10).replaceAll('-', '');
    var to = lastDay.toISOString().slice(0, 10).replaceAll('-', '')

    let tasks: Task[] = [];
    return this.axiosInstance.get<Report>(`/time_entries?from=${from}&to=${to}`)
      .then((response) => {
        for (let i = 0; i < response.data.time_entries.length; i++) {
          const entry = response.data.time_entries[i];
          let hasTask = tasks.some(t => t['note'] === entry.notes)
          if (!hasTask) {
            tasks.push({
              note: entry.notes,
              type: entry.task.name
            });
          }
        }
        return Promise.resolve(tasks);
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


interface Report {
  time_entries: TimeEntry[];
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page?: any;
  previous_page?: any;
  page: number;
}
