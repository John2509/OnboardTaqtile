import { LocalData } from "../data/LocalData";
import { KEYS } from "../data/config";
import Navigation from "../core/navigation";

export default class Home {
  localData: LocalData;

  constructor() {
    this.localData = new LocalData();
  }

  async getUserName(): Promise<string> {
    return this.localData.get(KEYS.USER_KEY)
  }

  async logout(): Promise<void> {
    await this.localData.remove(KEYS.USER_KEY);
    await this.localData.remove(KEYS.TOKEN_KEY);
    Navigation.goToAuth();
  }

  async goUserList(componentId: string): Promise<void> {
    Navigation.pushScreen(componentId, 'UserList')
  }

  async goUserCreate(componentId: string): Promise<void> {
    Navigation.pushScreen(componentId, 'UserCreate')
  }
}