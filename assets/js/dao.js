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
    console.log(r);
    return r;
  });

const weather = (city, country) =>
  query("weather", `q=${city}${country ? "," + country : ""}`);

const forecast = (city, country) =>
  query("forecast", `q=${city}${country ? "," + country : ""}`);

const iconSrc = code => `${weatherApi.iconUri}/${code}.png`;
