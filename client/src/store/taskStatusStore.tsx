import { makeAutoObservable } from "mobx";

class Task {
  onClickOpenWindowNewTask: boolean = false; // Создание task
  onClickOpenwindowTitleTask: boolean = false; // Открытие окна "Входящие"
  onClickOpenWindowDoneTask: boolean = false; // Открытие окна "Выполнено"
  onClickOpenWindowExpiredTask: boolean = false; // Открытие окна "Просрочено"
  onClickOpenWindowMessageTask: boolean = false; // Открытие окна "Уведомление о таксах"
  onWindowLoading: boolean = false; // Окно загрузки (модификация)
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
  postWindowExpiredTask(status: boolean) {
    if (this.onClickOpenWindowExpiredTask != status) {
      this.onClickOpenWindowExpiredTask = status;
    }
  }
  postWindowMessageTask(status: boolean) {
    if (this.onClickOpenWindowMessageTask != status) {
      this.onClickOpenWindowMessageTask = status;
    }
  }
  postWindowLoading(state: boolean) {
    if (this.onWindowLoading != state) {
      this.onWindowLoading = state;
    }
  }

  getWindowTask() {
    return this.onClickOpenWindowNewTask;
  }
  getWindowTitleTask() {
    return this.onClickOpenwindowTitleTask;
  }
  getWindowDoneTask() {
    return this.onClickOpenWindowDoneTask;
  }
  getWindowExpiredTask() {
    return this.onClickOpenWindowExpiredTask;
  }
  getWindowMessageTask() {
    return this.onClickOpenWindowMessageTask;
  }
  getWindowLoading() {
    return this.onWindowLoading;
  }
}

export const task = new Task();
