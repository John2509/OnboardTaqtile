import { LocalData } from "../data/LocalData";
import { KEYS } from "../data/config";
import Navigation from "../core/navigation";

export default class Initializing {
  private localData: LocalData;

  constructor(){
    this.localData = new LocalData();
  }

  async load() {
    try {
      const user = await this.localData.get(KEYS.USER_KEY);
      if (user) {
        Navigation.goHome();
      } else {
        Navigation.goToAuth();
      }
    } catch (err) {
      Navigation.goToAuth();
    }
  }
}