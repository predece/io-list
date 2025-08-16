import { makeAutoObservable } from "mobx";

interface ImessageConf {
  quantity: number;
  status: boolean;
}

class NewMessage {
  config: ImessageConf = { quantity: 0, status: false };
  constructor() {
    makeAutoObservable(this);
  }
  postQuantity(page: number) {
    this.config.quantity = page;
  }

  getQuantity() {
    return this.config.quantity;
  }
}

export const Message = new NewMessage();
