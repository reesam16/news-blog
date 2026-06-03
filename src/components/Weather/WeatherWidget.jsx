import { useState, useEffect } from 'react';
import styles from './Weather.module.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...' });

    useEffect(() => {
        const fetchWeather = async () => {
            const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
            
            if (!API_KEY) {
                console.error("API Key is missing! Check your .env file.");
                return;
            }

            const lat = -37.8; // Matamata, NZ (Hobbiton)
            const lon = 175.7;

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );

                if (!response.ok) throw new Error('Weather report unavailable');

                const data = await response.json();

                setWeather({
                    temp: Math.round(data.main.temp),
                    condition: data.weather[0].main // e.g., 'Clouds', 'Clear'
                });
            } catch (error) {
                console.error(error);
                setWeather({ temp: '??', condition: 'Foggy' });
            }
        };
        fetchWeather();
    }, []);

    return (
        <div className={styles.weatherBox}>
            <h3>Daily Forecast</h3>
            <p>Current conditions in Hobbiton:</p>
            <div className={styles.temp}>{weather.temp}°C</div>
            <p className={styles.conditionText}>{weather.condition} skies over the Shire.</p>
        </div>
    );
};

export default WeatherWidget;