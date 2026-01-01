import { fetchOpenWeatherData } from '../utils/api';
import { getStorageOptions, getStoredCities, setStorageCities, setStorageOptions } from '../utils/storage';

// setting default values
chrome.runtime.onInstalled.addListener(() => {
  getStorageOptions().then((options) => {
    if (options) {
      setStorageOptions(options);
    } else {
      setStorageOptions({ homeCity: '', tempScale: 'metric', hasAutoOverlay: false });
    }
  });

  getStoredCities().then((cities) => {
    if (cities) {
      setStorageCities(cities);
    } else {
      setStorageCities([]);
    }
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'weatherExtension',
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((e) => {
  getStoredCities().then((cities) => {
    if (!cities.includes(e.selectionText)) {
      setStorageCities([...cities, e.selectionText]);
    }
  });
});

function setBadge() {
  getStorageOptions().then((options) => {
    if (!options.homeCity) return;
    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbol = options.tempScale === 'metric' ? '\u2103' : '\u2109';
      chrome.action.setBadgeText({
        text: `${temp} ${symbol}`,
      });
    });
  });
}

chrome.alarms.onAlarm.addListener(() => {
  setBadge();
});

setBadge();
