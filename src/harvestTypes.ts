export type HarvestReport = {
  time_entries: TimeEntry[];
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page?: any;
  previous_page?: any;
  page: number;
}

type HarvestTask = {
  id: number;
  name: string;
}

type TimeEntry = {
  id: number;
  spent_date: string;
  task: HarvestTask;
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
