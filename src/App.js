import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LoadingElement from "./components/LoadingElement";
import WeatherResult from "./components/WeatherResult";
import { getCurrentWeather } from "./api/apis";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoaing] = useState(true);

  const setDataWorkFlow = async (cityName) => {
    setIsLoaing(true);
    const weather = await getCurrentWeather(cityName);
    if (weather) {
      weather.temperature = parseFloat(weather.main.temp - 273.15).toFixed(1);
      setWeather(weather);
    }
    setIsLoaing(false);
  };

  useEffect(() => {
    setDataWorkFlow("sydney");
  }, []);
  return (
    <div className={weather.temperature > 16 ? "container warm" : "container"}>
      <SearchBar setDataWorkFlow={setDataWorkFlow} />
      {isLoading ? (
        <LoadingElement loading={isLoading} />
      ) : (
        <WeatherResult {...weather} />
      )}
    </div>
  );
};

export default App;
