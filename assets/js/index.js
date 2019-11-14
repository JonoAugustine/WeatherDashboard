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
  const base = Row(null, { height: "100%" });

  // Seach
  let searchPanel = SearchPanel();
  const searchCol = Col(null, { width: "25%", padding: "0.5em" })
    .addClass("col-search")
    .append(searchPanel);

  // Weather Detials
  let weatherPanel = Row(null, { padding: "0.5em" }).addClass("centered");

  const forecastPanel = Row(null, { padding: "0.5em" }).addClass("centered");

  const weatherCol = Col(null, { "max-width": "100%", width: "70%" }).append(
    weatherPanel,
    forecastPanel
  );

  base.append(searchCol, weatherCol);

  forecast("rockville", "us")
    .then(filterForecast)
    .then(fs => fs.map(f => ForecastCard(f)))
    .then(fcs => forecastPanel.append(fcs));

  weather("rockville", "us").then(r => weatherPanel.append(WeatherCard(r)));

  return base;
};

show(Dashboard());
