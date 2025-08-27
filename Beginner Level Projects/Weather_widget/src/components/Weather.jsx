import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState(""); //User input
  const [weather, setWeather] = useState(null); //Weather data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "d0b32415864c3d1ddd7ba666b7d1e400";

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather App</h1>

      {/* Input and button */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city ..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-400 px-4 py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-200">{error}</p>}

      {/* Weather Display */}
      {weather && (
        <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg w-80 text-center">
          <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
          <p className="text-5xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p className="mt-2">💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
