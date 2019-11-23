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

const Dashboard = () => {
  const base = Row({ height: "100%", paddingTop: "0.5em" }).addClass(
    "centered"
  );

  // Weather Detials
  let weatherPanel = Row({ padding: "0 0.5em" }).addClass("centered");

  const forecastPanel = Row({
    padding: "0.5em",
    "max-height": "50%",
    "overflow-y": "auto"
  }).addClass("centered");

  const setup = (city, country) => {
    forecastPanel.empty();
    weatherPanel.empty();
    weather(city, country)
      .then(WeatherCard)
      .then(c => weatherPanel.append(c));
    forecast(city, country)
      .then(f => filterForecast(f))
      .then(fs => fs.map(ForecastCard))
      .then(fcs => forecastPanel.append(fcs));
  };

  // Seach
  let searchPanel = SearchPanel(setup);
  const searchCol = Col()
    .addClass("col-search")
    .append(searchPanel);

  const weatherCol = Col({ "max-width": "100%", width: "70%" }).append(
    weatherPanel,
    forecastPanel
  );

  base.append(searchCol, weatherCol);

  return base;
};

const dash = Dashboard();
show(dash);
