import { makeAutoObservable } from "mobx";

interface Iuser {
  name: string;
  img: string;
}

class UserStore {
  user: Iuser | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  postUser({ name, img }: Iuser) {
    this.user = { name, img };
  }
  getUser() {
    return this.user;
  }
}

export const User = new UserStore();
