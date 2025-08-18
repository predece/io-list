import { makeAutoObservable, toJS } from "mobx";

export interface Itask {
  id?: number;
  title: string;
  description: string;
  UserId: string;
  deadline: Date | null;
  priority: string;
  status: string;
  notified: boolean;
}

class TaskDeadline {
  task: Itask[] = [];
  taskDeadline: Itask[] = [];
  taskFinished: Itask[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  postTask(configuration: Itask[]) {
    if (Array.isArray(configuration)) {
      this.task = configuration;
    } else {
      this.task.push(configuration);
    }
  }
  postTaskDeadline(configuration: Itask[]) {
    if (Array.isArray(configuration)) {
      this.taskDeadline = configuration;
    } else {
      this.taskDeadline.push(configuration);
    }
  }
  postTaskFinished(configuration: Itask[]) {
    if (Array.isArray(configuration)) {
      this.taskFinished = configuration;
    } else {
      this.taskFinished.push(configuration);
    }
  }

  getTask() {
    return toJS(this.task);
  }
  getTaskDeadline() {
    return toJS(this.taskDeadline);
  }
  getTaskFinished() {
    return toJS(this.taskFinished);
  }
}

export const TaskDeadlineStore = new TaskDeadline();
