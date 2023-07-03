import { setStorageCities, setStorageOptions } from '../utils/storage';

// setting default values
chrome.runtime.onInstalled.addListener(() => {
  setStorageCities([]);
  setStorageOptions({ tempScale: 'metric' });
});
