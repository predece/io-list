import { makeAutoObservable } from "mobx";

class NewMessage {
  message: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  postMessage(message: string) {
    this.message = message;
  }
  getMessage() {
    return this.message;
  }
}

export const message = new NewMessage();
