import { AsyncStorage } from 'react-native';
import { KEYS } from './config';

export class LocalData {
  async set(key: KEYS, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async get(key: KEYS): Promise<string> {
    return await AsyncStorage.getItem(key) || "";
  }

  async remove(key: KEYS): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}