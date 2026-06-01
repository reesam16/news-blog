import { useState, useEffect } from 'react';
import styles from './Quote.module.css';

const quotes = [
    { text: "All we have to decide is what to do with the time that is given us.", author: "Gandalf" },
    { text: "Not all those who wander are lost.", author: "Bilbo Baggins" },
    { text: "It's a dangerous business, Frodo, going out your door.", author: "Bilbo Baggins" },
    { text: "Even the smallest person can change the course of the future.", author: "Galadriel" },
    { text: "Faithless is he that says farewell when the road darkens.", author: "Gimli" },
    { text: "I will not say: do not weep; for not all tears are an evil.", author: "Gandalf" },
    { text: "There is some good in this world, and it's worth fighting for.", author: "Samwise Gamgee" },
    { text: "A wizard is never late, nor is he early, he arrives precisely when he means to.", author: "Gandalf" },
    { text: "All that is gold does not glitter, not all those who wander are lost.", author: "Bilbo Baggins" },
    { text: "I would rather share one lifetime with you than face all the ages of this world alone.", author: "Arwen" },
    { text: "The world is not in your books and maps, it's out there.", author: "Gandalf" },
    { text: "I found it is the small everyday deed of ordinary folk that keep the darkness at bay.", author: "Gandalf" },
    { text: "Deeds will not be less valiant because they are unpraised.", author: "Aragorn" },
    { text: "I have found that it is the small everyday deed of ordinary folk that keep the darkness at bay. Small acts of kindness and love.", author: "J.R.R. Tolkien" },
    { text: "Fantasy is escapist, and that is its glory.", author: "J.R.R. Tolkien" },
    { text: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.", author: "J.R.R. Tolkien" },
    { text: "Moonlight drowns out all but the brightest stars.", author: "J.R.R. Tolkien" },
    { text: "The wide world is all about you: you can fence yourselves in, but you cannot forever fence it out.", author: "J.R.R. Tolkien" },
    { text: "One of the tasks of a writer is to create a world, but it must be a world that has meaning.", author: "J.R.R. Tolkien" },
    { text: "The tales never really end.", author: "J.R.R. Tolkien" },
    { text: "Never laugh at live dragons.", author: "J.R.R. Tolkien" },
    { text: "Short cuts make long delays.", author: "J.R.R. Tolkien" }
];

const Quote = () => {
    const [dailyQuote, setDailyQuote] = useState({});

    useEffect(() => {
        // Pick a random quote when the component mounts
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setDailyQuote(quotes[randomIndex]);
    }, []);

    return (
        <div className={styles.quoteCard}>
            <h3 className={styles.title}>Words of Wisdom</h3>
            <p className={styles.text}>"{dailyQuote.text}"</p>
            <p className={styles.author}>— {dailyQuote.author}</p>
        </div>
    );
};

export default Quote;