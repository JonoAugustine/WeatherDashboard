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

const weather = (city, country) => {
  if (localStorage["w"]) {
    return new Promise(resolve => resolve(JSON.parse(localStorage["w"])));
  } else {
    return query("weather", `q=${city}${country ? "," + country : ""}`).then(
      r => (localStorage["w"] = JSON.stringify(r))
    );
  }
};

const forecast = (city, country) => {
  if (localStorage["f"]) {
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

const seachLocal = "searchHistory";
const searchHistory = (...searches) => {
  if (typeof localStorage[seachLocal] !== "object")
    localStorage[seachLocal] = "[]";
  let s = JSON.parse(localStorage[seachLocal]);
  searches.filter(sch => typeof sch === "string").forEach(s.push);
  localStorage[seachLocal] = JSON.stringify(s);
  return s;
};
