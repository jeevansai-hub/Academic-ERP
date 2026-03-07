import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // WMO Weather codes mapped to simple descriptions
  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if ([1, 2, 3].includes(code)) return "Partly cloudy";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65].includes(code)) return "Rain";
    if ([80, 81, 82].includes(code)) return "Showers";
    if (code === 95) return "Thunderstorm";
    return "Unknown weather";
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const cached = localStorage.getItem('viit_weather_cache');
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // cache for 30 mins
          if (new Date().getTime() - timestamp < 30 * 60 * 1000) {
            setWeather(data);
            setLoading(false);
            return;
          }
        }

        const lat = import.meta.env.VITE_WEATHER_LAT || '18.5204';
        const lon = import.meta.env.VITE_WEATHER_LON || '73.8567';
        
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`);
        const result = await response.json();
        
        const data: WeatherData = {
          temperature: result.current_weather.temperature,
          description: getWeatherDescription(result.current_weather.weathercode),
          humidity: result.hourly.relativehumidity_2m[0] // approximation from top of the hour
        };

        localStorage.setItem('viit_weather_cache', JSON.stringify({
          data,
          timestamp: new Date().getTime()
        }));
        
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, loading };
};
