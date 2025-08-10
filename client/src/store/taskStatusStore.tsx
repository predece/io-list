import { makeAutoObservable } from "mobx";

class Task {
  onClickOpenWindowNewTask: boolean = false; // Создание task
  onClickOpenwindowTitleTask: boolean = false; // Открытие окна "Входящие"
  onClickOpenWindowDoneTask: boolean = false; // Открытие окна "Выполнено"
  constructor() {
    makeAutoObservable(this);
  }
  postWindowTask(status: boolean) {
    if (this.onClickOpenWindowNewTask != status) {
      this.onClickOpenWindowNewTask = status;
    }
  }
  postWindowTitleTask(status: boolean) {
    if (this.onClickOpenwindowTitleTask != status) {
      this.onClickOpenwindowTitleTask = status;
    }
  }
  postWindowDoneTask(status: boolean) {
    if (this.onClickOpenWindowDoneTask != status) {
      this.onClickOpenWindowDoneTask = status;
    }
  }
  getWindowTask() {
    return this.onClickOpenWindowNewTask;
  }
  getWindowTitleTask() {
    return this.onClickOpenwindowTitleTask;
  }
  gettWindowDoneTask() {
    return this.onClickOpenWindowDoneTask;
  }
}

export const task = new Task();
