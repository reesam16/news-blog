import { useState, useEffect } from 'react';
import styles from './History.module.css';

const History = () => {
    const [event, setEvent] = useState({ text: 'Consulting the Archives...', year: '' });

    useEffect(() => {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const fetchHistory = async () => {
            try {
                const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`);
                const data = await response.json();
                // We pick one random event from the list of events for today
                const events = data.events;
                const randomEvent = events[Math.floor(Math.random() * events.length)];
                setEvent({ text: randomEvent.text, year: randomEvent.year });
            } catch (error) {
                setEvent({ text: 'The archives are temporarily closed for cleaning.', year: '' });
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className={styles.historyCard}>
            <h3 className={styles.title}>On This Day</h3>
            <p className={styles.eventText}>{event.year}: {event.text}</p>
        </div>
    );
};

export default History;