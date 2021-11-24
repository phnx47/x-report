export type HarvestReport = {
  time_entries: TimeEntry[];
  per_page: number;
  total_pages: number;
  total_entries: number;
  next_page?: number;
  previous_page?: number;
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
  created_at: string;
  updated_at: string;
}
