const Row = (callback, css) => {
  const n = neue("div").addClass("row");
  if (css) n.css(css);
  if (typeof callback === "function") callback(n);
  return n;
};

const Col = (callback, css) => {
  const n = neue("div").addClass("col");
  if (css) n.css(css);
  if (typeof callback === "function") callback(n);
  return n;
};

const ForecastIcon = code =>
  neue("img")
    .attr("src", iconSrc(code))
    .addClass("weather-icon");

const ForecastCard = forecast =>
  neue("div")
    .addClass("card forecast-card")
    .css({
      margin: "5px 1em"
    })
    .append(
      ForecastIcon(forecast.weather[0].icon),
      Row(n => n.text(forecast.date.toLocaleDateString("en-US")), {
          margin: '15px 0 20px 0'
      }),
      Row(n => n.text(`Temp: ${forecast.main.temp}C`))
    );
