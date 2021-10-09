export interface Task {
  typeId: number,
  typeName: string;
  note: string;
}

export interface Report {
  from: string;
  to: string;
  tasks: Task[];
}
