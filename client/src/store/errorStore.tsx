import { makeAutoObservable } from "mobx";

class ErrorStore {
  error: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  postError(errorMessage: string) {
    this.error = "";
    this.error = errorMessage;
  }
  getError() {
    return this.error;
  }
  clearError() {
    this.error = "";
  }
}

export const Estore = new ErrorStore();
