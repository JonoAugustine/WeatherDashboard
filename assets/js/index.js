get("sidebar_open").click(() => get("sidebar").removeClass("closed"));
get("sidebar_close").click(() => get("sidebar").addClass("closed"));

/**
 * Reduces forecast list to contain only mid-day forecasts.
 * Also adds a new property ``date`` to the each forcast as
 * the parsed Date object.
 * @param {*} forecast The root forcast API response
 */
const filterForecast = forecast =>
  forecast.list.filter(f => {
    f.date = new Date(f.dt_txt);
    return f.date.getHours() === 12;
  });

const currentWeatherDiv = get("current");
const forecastPanel = get("forecast_panel");

const updateSearchHistory = () => {
  const history = get("history").empty();
  getSearchHistory()
    .map(t => SearchHistoryUnit(t, () => search(t)))
    .forEach(u => history.append(u));
};

updateSearchHistory();

const search = city => {
  city = city ? city : getFormValues(get("search_form")).search;
  currentWeatherDiv.empty();
  forecastPanel.empty();
  Promise.all([
    weather(city)
      .then(WeatherCard)
      .then(c => currentWeatherDiv.append(c)),
    forecast(city)
      .then(f => filterForecast(f))
      .then(fs => fs.map(ForecastCard))
      .then(fcs => forecastPanel.append(...fcs))
  ])
    .then(() => get("weather").addClass("filled"))
    .then(updateSearchHistory);
};

search("rockville");
