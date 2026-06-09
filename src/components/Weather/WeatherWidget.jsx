import { useState, useEffect } from 'react';
import styles from './Weather.module.css';

const WeatherWidget = () => {
    const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...', wind: 'Loading...', windDir: 'Loading...', windDeg: 0 });

    const getCompassDirection = (deg) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        // Divide by 45 to map 360 degrees to 8 segments
        const index = Math.round(deg / 45) % 8;
        return directions[index];
    };

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
                    condition: data.weather[0].main, // e.g., 'Clouds', 'Clear'
                    wind: data.wind.speed,
                    windDir: getCompassDirection(data.wind.deg),
                    windDeg: data.wind.deg
                });
            } catch (error) {
                console.error(error);
                setWeather({ temp: '??', condition: 'Foggy', wind: '--', windDir: '--' });
            }
        };
        fetchWeather();
    }, []);

    return (
        <div className={styles.weatherBox}>
            <h3>Daily Forecast</h3>
            <p>Current conditions in Hobbiton: Matamata, NZ</p>
            <div className={styles.temp}>{weather.temp}°C</div>
            <div className={styles.wind}>Wind: {weather.wind} m/s from the {weather.windDir}</div>

            {/* Use the compass directly as the container */}
            <div className={styles.compass}>
                <span className={`${styles.label} ${styles.n}`}>N</span>
                <span className={`${styles.label} ${styles.e}`}>E</span>
                <span className={`${styles.label} ${styles.s}`}>S</span>
                <span className={`${styles.label} ${styles.w}`}>W</span>
                <div
                    className={styles.windArrow}
                    style={{ '--rotation': `${weather.windDeg}deg` }}
                >
                </div>
            </div>

            <p className={styles.conditionText}>{weather.condition} skies over the Shire.</p>
        </div>
    );
};

export default WeatherWidget;