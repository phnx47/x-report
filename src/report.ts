export interface Task {
  type: string;
  note: string;
}

export interface Report {
  from: string;
  to: string;
  tasks: Task[];
}
