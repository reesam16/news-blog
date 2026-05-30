import styles from './Weather.module.css';

const WeatherWidget = () => {
    return (
        <div className={styles.weatherBox}>
            <h3>Daily Forecast</h3>
            <p>Current conditions in Hobbiton:</p>
            <div className={styles.temp}>22°C</div>
            <p>Fair skies over the Shire.</p>
        </div>
    );
};

export default WeatherWidget;