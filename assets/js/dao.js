const weatherApi = {
  key: "354ddeaa96277af2d8db4d37ae27483d",
  uri: "api.openweathermap.org/data/2.5"
};

const queryUrl = (type = `${weatherApi.uri}/${type}?appid=${weatherApi.key}`);

const query = (type, queryString) =>
  $.ajax({
    type: "GET",
    url: `${queryUrl(type)}&${queryString}`
  });

const weather = (city, country) => {};

const forecast = (city, country) => {};
