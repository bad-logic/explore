import { OpenWeatherTempScale } from './api';

export interface LocalStorageOptions {
  hasAutoOverlay: boolean;
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}
export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStorageCities(cities: string[]): Promise<void> {
  const data: LocalStorage = {
    cities,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
}

export function setStorageOptions(options: LocalStorageOptions): Promise<void> {
  const data: LocalStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => {
      resolve();
    });
  });
}

export function getStorageOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
