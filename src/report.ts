export interface Task {
  id: number,
  name: string;
  notes: string[];
}

export interface Report {
  from: string;
  to: string;
  tasks: Task[];
}


export function printReport(report: Report){
  let text = `Report from *${report.from}* to *${report.to}* \n\n`;
  report.tasks.forEach((task) => {
    text = text + `*${task.name}*\n`;
    task.notes.forEach((note) => {
      text = text + `- ${note}\n`;
    })
  });
  console.log(text);
}
