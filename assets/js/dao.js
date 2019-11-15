const weatherApi = {
  key: "354ddeaa96277af2d8db4d37ae27483d",
  uri: "https://api.openweathermap.org/data/2.5",
  iconUri: "http://openweathermap.org/img/wn/"
};

const queryUrl = type =>
  `${weatherApi.uri}/${type}?appid=${weatherApi.key}&units=metric`;

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
 * city & country (optional).
 * @param {String} city
 * @param {String} country
 */
const weather = (city, country) => {
  if (false) {
    //localStorage["w"]) {
    return new Promise(resolve => resolve(JSON.parse(localStorage["w"])));
  } else {
    return query("weather", `q=${city}${country ? "," + country : ""}`).then(
      r => {
        localStorage["w"] = JSON.stringify(r);
        return r;
      }
    );
  }
};

/**
 * Make a request to the OpenWeather API for the 5-day forecast in the given
 * city & country (optional).
 * @param {String} city
 * @param {String} country
 */
const forecast = (city, country) => {
  if (false) {
    //localStorage["f"]) {
    return new Promise(resolve => resolve(JSON.parse(localStorage["f"])));
  } else {
    return query("forecast", `q=${city}${country ? "," + country : ""}`).then(
      r => {
        localStorage["f"] = JSON.stringify(r);
        return r;
      }
    );
  }
};

const iconSrc = (code, size) =>
  `${weatherApi.iconUri}/${code}${size ? `@${size}x` : ""}.png`;

/** Search history location */
const seachLocal = "searchHistory";
/**
 * Get and optionally add to the localStorage search history
 * @param  {...string} searches Optional string parameters to add to search history
 */
const searchHistory = (...searches) => {
  if (typeof localStorage[seachLocal] !== "object")
    localStorage[seachLocal] = "[]";
  let s = JSON.parse(localStorage[seachLocal]);
  searches.filter(sch => typeof sch === "string").forEach(sch => s.push(sch));
  localStorage[seachLocal] = JSON.stringify(s);
  return s;
};
