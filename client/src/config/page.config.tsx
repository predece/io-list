class Configuration {
  getLogin() {
    return "/auth?type=login";
  }
  getRegistration() {
    return "/auth?type=registration";
  }
  getIOList() {
    return "/IO-list";
  }
}

export const CONFIG = new Configuration();
