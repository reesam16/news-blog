// JokeComponent.jsx
import { useState, useEffect } from 'react';
import styles from './Joke.module.css'

const Joke = () => {
    const [joke, setJoke] = useState({ setup: '', punchline: '' });

    useEffect(() => {
        const fetchJoke = async () => {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await response.json();
            setJoke(data);
        };
        fetchJoke();
    }, []);

    return (
        <div className={styles.jokeCard}>
            <h3>Bad Joke of the Day</h3>
            <p>{joke.setup}</p>
            <p><strong>{joke.punchline}</strong></p>
        </div>
    );
};
export default Joke;