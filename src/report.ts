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


export function printReport(report: Report){
  let text = `Report from *${report.from}* To *${report.to}* \n\n`;
  report.tasks.forEach((task) => {
    text = text + `${task.note} [${task.typeName}]\n`;
  });
  console.log(text);
}
