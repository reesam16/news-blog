import { useParams, Link } from 'react-router-dom';
import { dummyArticles } from '../../../tempData.js';
import WeatherWidget from '../../components/Weather/WeatherWidget';
import styles from './BlogPost.module.css';
import { useState } from 'react';

const BlogPost = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { id } = useParams();

    // 1. Fetch from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('tempPosts')) || [];

    // 2. Create the combined master list
    const allArticles = [...dummyArticles, ...savedPosts];

    // 3. Find the specific post
    const article = allArticles.find((a) => a.id === parseInt(id));

    if (!article) {
        return <h2>Article not found!</h2>;
    }

    return (
        <div className={styles.pageWrapper}>
            <main className={styles.postContainer}>
                <Link to="/" className={styles.backLink}>← Back to Home</Link>
                <h1>{article.headline}</h1>
                <p><strong>{article.author}</strong> | {article.date}</p>
                <hr />

                {article.imageId ? (
                    <>
                        {/* The Overlay (appears only when isExpanded is true) */}
                        {isExpanded && (
                            <div className={styles.overlay} onClick={() => setIsExpanded(false)}>
                                <img
                                    className={styles.expandedImg}
                                    src={`https://picsum.photos/id/${article.imageId}/800/600`}
                                    alt={article.headline}
                                />
                            </div>
                        )}

                        {/* The main visible image */}
                        <img
                            className={styles.blogImg}
                            src={`https://picsum.photos/id/${article.imageId}/800/400`}
                            alt={article.headline}
                            onClick={() => setIsExpanded(true)}
                        />
                    </>
                ) : null}

                <div className={styles.body}><p>{article.body}</p> </div>

            </main>
            <aside className={styles.sidebar}>
                <WeatherWidget />
            </aside>
        </div>
    );
};

export default BlogPost; 