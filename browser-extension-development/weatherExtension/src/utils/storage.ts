export interface LocalStorage {
  cities?: string[];
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
