const weatherApi = {
  key: "354ddeaa96277af2d8db4d37ae27483d",
  uri: "https://api.openweathermap.org/data/2.5",
  iconUri: "http://openweathermap.org/img/wn/"
};

const cacheLocation = "cache";

const saveCache = cache => {
  console.log("updating cache", cache);
  localStorage[cacheLocation] = JSON.stringify(cache);
  return cache;
};

/** @returns all of the cached data. */
const getCache = () => {
  let _cache = localStorage[cacheLocation];
  return typeof _cache !== "string" ? saveCache({}) : JSON.parse(_cache);
};

/**
 * Set &/or get cached data for the given city.
 * @param {string} city
 * @param {*} weather
 * @param {*} forecast
 */
const cacheEntry = (city, weather, forecast) => {
  const cache = getCache();
  let entry = cache[city];

  if (typeof entry !== "object") {
    entry = { city: city, weather: weather, forecast: forecast };
    cache[city] = entry;
  } else {
    if (typeof weather === "object") entry["weather"] = weather;
    if (typeof forecast === "object") entry["forecast"] = forecast;
  }

  saveCache(cache);

  return entry;
};

/** @returns all city names in cache. */
const getSearchHistory = () => Object.keys(getCache());

const queryUrl = type => {
  return `${weatherApi.uri}/${type}?appid=${weatherApi.key}&units=metric`;
};

const query = (type, queryString) =>
  $.ajax({
    type: "GET",
    url: `${queryUrl(type)}&${queryString}`,
    crossDomain: true
  }).then(r => {
    console.log("request", r);
    return r;
  });

/**
 * Make a request to the OpenWeather API for current weather in the given
 * city & country (optional). If the city is found in cache, it's cached data
 * will be returned in the Promise.
 * @param {String} city
 * @param {String} country
 */
const weather = (city, country) => {
  return cacheEntry(city).weather
    ? new Promise(res => res(cacheEntry(city).weather))
    : // If no cached data is found, make a request and encache
      query("weather", `q=${city}${country ? "," + country : ""}`).then(r =>
        cacheEntry(city, r)
      );
};

/**
 * Make a request to the OpenWeather API for the 5-day forecast in the given
 * city & country (optional). If the city is found in cache, it's cached data
 * will be returned in the Promise.
 * @param {String} city
 * @param {String} country
 */
const forecast = (city, country) => {
  return cacheEntry(city).forecast
    ? new Promise(res => res(cacheEntry(city).forecast))
    : query("forecast", `q=${city}${country ? "," + country : ""}`).then(r =>
        cacheEntry(city, null, r)
      );
};

const iconSrc = (code, size) => {
  return `${weatherApi.iconUri}/${code}${size ? `@${size}x` : ""}.png`;
};
