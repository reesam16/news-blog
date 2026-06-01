import { useState, useEffect } from 'react'; // Added hooks
import styles from './Home.module.css';
import WeatherWidget from '../../components/Weather/WeatherWidget';
import Joke from '../../components/Joke/Joke';
import History from'../../components/History/History';
import Quote from '../../components/Quote/Quote';
import { dummyArticles } from '../../../tempData.js';
import { Link } from 'react-router-dom';

function Home({ searchTerm }) {
    const [allArticles, setAllArticles] = useState(dummyArticles);



    const displayArticles = [...allArticles]
        .sort((a, b) => b.id - a.id) // Sort first
        .filter(article =>{          // Filter second
            const lowerTerm = searchTerm.toLowerCase();

            return (
                article.headline.toLowerCase().includes(lowerTerm) ||
                (article.author && article.author.toLowerCase().includes(lowerTerm))
            );
        });

    useEffect(() => {
        // Fetch from localStorage
        const savedPosts = JSON.parse(localStorage.getItem('tempPosts')) || [];
        // Merge and set state
        setAllArticles([...dummyArticles, ...savedPosts]);
    }, []);



    return (
        <div className={styles.container}>
            <header className={styles.masthead}>
                <h1>The Middle-earth Blog</h1>
            </header>

            <main className={styles.mainContent}>
                {displayArticles.length > 0 ? (
                displayArticles.map((article, index) => (
                    <article
                        key={article.id}
                        className={index === 0 ? styles.featuredCard : styles.articleCard}
                    >
                        {article.imageId && (
                            <img
                                src={`https://picsum.photos/id/${article.imageId}/400/200`}
                                alt={article.headline}
                                style={{ width: '100%', borderRadius: '8px' }}
                            />
                        )}
                        <h2>{article.headline}</h2>
                        <p className={styles.author}>{article.author} | {article.date}</p>
                        <p className={styles.body}>
                            {/* Check if body exists before substring to avoid errors */}
                            {article.body ? article.body.substring(0, 150) : ''}...
                        </p>
                        <Link to={`/blog/${article.id}`}>Read Full Article</Link>
                    </article>
                ))
                ) : (
                    <div className={styles.noResults}>
                        <h2>No Articles Found</h2>
                        <p>Sorry, we couldn't find any articles matching "{searchTerm}".</p>
                        <button onClick={() => window.location.reload()} className={styles.clearSearch}>Clear Search</button>
                    </div>
                )}
                
            </main>

            <aside className={styles.sidebar}>
                <WeatherWidget />
                <Quote />
                <Joke />
                <History />
            </aside>
        </div>
    );
}

export default Home;