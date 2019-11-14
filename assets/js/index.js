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

forecast("rockville", "us")
  .then(filterForecast)
  .then(fs => fs.map(f => ForecastCard(f)))
  .then(fcs => show(fcs));
