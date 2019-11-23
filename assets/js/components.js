const Container = (className, callback, css) => {
  const c = neue("div").addClass(className);
  if (css) c.css(css);
  if (typeof callback === "function") callback(c);
  return c;
};

const Row = (css, callback) => Container("row", callback, css);

const Col = (css, callback) => Container("col", callback, css);

const Card = (css, callback) => Container("card", callback, css);

const WeatherIcon = (code, size) => {
  return neue("img")
    .attr("src", iconSrc(code, size))
    .addClass("weather-icon");
};

const ForecastCard = forecast => {
  return Card()
    .addClass("forecast-card")
    .append(
      WeatherIcon(forecast.weather[0].icon),
      Row(null, n => n.text(forecast.date.toLocaleDateString("en-US"))),
      Row(null, n => n.text(`Temp: ${forecast.main.temp}C`)),
      Row(null, n => n.text(`Humidity: ${forecast.main.humidity}%`))
    );
};

const WeatherCard = weather => {
  return Card()
    .addClass("weather-card")
    .append(
      WeatherIcon(weather.weather[0].icon),
      neue("h3")
        .css({
          "font-size": "1.5em",
          "grid-area": "header"
        })
        .text(`${weather.name} (${new Date().toLocaleDateString("en-US")})`),
      neue("div")
        .css({
          "grid-area": "temp"
        })
        .text(`Temp: ${weather.main.temp}C`),
      neue("div")
        .css({
          "grid-area": "humid"
        })
        .text(`Humidity: ${weather.main.humidity}%`),
      neue("div")
        .css({ "grid-area": "wind" })
        .text(`Wind Speed: ${weather.wind.speed}`)
    );
};

const SearchHistoryUnit = (text, setup) => {
  const row = Row().addClass("history-unit");
  row.text(text);
  row.click(() => setup(text));
  return row;
};

const SearchPanel = setup => {
  const panel = Card({ "min-height": "20%", "max-height": "100%" });
  const searchRow = Row().addClass("centered");
  const historyCol = Col().addClass("centered");

  const updateSearchHistory = () => {
    historyCol.empty();
    getSearchHistory()
      .map(t => SearchHistoryUnit(t, setup))
      .forEach(u => historyCol.append(u));
  };

  const input = neue("input")
    .attr("id", "search")
    .addClass("input-search");

  const searchBtn = neue("button")
    .text("Search")
    .addClass("btn-search")
    .click(() => {
      const t = $("#search")
        .val()
        .trim()
        .toLowerCase();
      if (t.length > 0) {
        setup(t);
        updateSearchHistory();
      }
    });

  searchRow.append(input, searchBtn);
  panel.append(searchRow, historyCol);

  updateSearchHistory();

  return panel;
};
