const Container = (className, callback, css) => {
  const c = neue("div").addClass(className);
  if (css) c.css(css);
  if (typeof callback === "function") callback(c);
  return c;
};

const Row = (callback, css) => Container("row", callback, css);

const Col = (callback, css) => Container("col", callback, css);

const Card = (callback, css) => Container("card", callback, css);

const WeatherIcon = (code, size) =>
  neue("img")
    .attr("src", iconSrc(code, size))
    .addClass("weather-icon");

const ForecastCard = forecast =>
  Card()
    .addClass("forecast-card")
    .append(
      WeatherIcon(forecast.weather[0].icon),
      Row(n => n.text(forecast.date.toLocaleDateString("en-US"))),
      Row(n => n.text(`Temp: ${forecast.main.temp}C`)),
      Row(n => n.text(`Humidity: ${forecast.main.humidity}`))
    );

const WeatherCard = weather =>
  Card()
    .addClass("weather-card")
    .append(
      WeatherIcon(weather.weather[0].icon, 2),
      Row(n => n.text(new Date().toLocaleDateString("en-US"))),
      Row(n => n.text(`Temp: ${weather.main.temp}C`)),
      Row(n => n.text(`Humidity: ${weather.main.humidity}`))
    );

const SearchPanel = () => {
  const search = searchHistory();
  console.log(search);
  return Card(null, { height: "100%" });
};
