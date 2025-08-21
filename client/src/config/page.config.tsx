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
  getHellowPage() {
    return "/";
  }
}

export const CONFIG = new Configuration();
