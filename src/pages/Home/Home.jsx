import { useState, useEffect } from 'react'; // Added hooks
import styles from './Home.module.css';
import WeatherWidget from '../../components/Weather/WeatherWidget';
import Joke from '../../components/Joke/Joke';
import History from '../../components/History/History';
import Quote from '../../components/Quote/Quote';
import { dummyArticles } from '../../../tempData.js';
import { Link } from 'react-router-dom';

function Home({ searchTerm }) {
    const [allArticles, setAllArticles] = useState(dummyArticles);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);



    const displayArticles = [...allArticles]
        .sort((a, b) => b.id - a.id) // Sort first
        .filter(article => {          // Filter second
            const lowerTerm = searchTerm.toLowerCase();

            return (
                article.headline.toLowerCase().includes(lowerTerm) ||
                (article.author && article.author.toLowerCase().includes(lowerTerm))
            );
        });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginatedArticles = displayArticles.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(displayArticles.length / postsPerPage);

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

            <main >
                <div className={styles.mainContent}>
                    {displayArticles.length > 0 && paginatedArticles.length > 0 ? (
                        <>

                            {/* Featured Article */}
                            <article className={styles.featuredCard}>
                                {paginatedArticles[0].imageId && (
                                    <img
                                        src={`https://picsum.photos/400/200?random=${paginatedArticles[0].id}`}
                                        alt={paginatedArticles[0].headline}
                                        className={styles.featuredCardImg}
                                        loading="lazy"
                                    />
                                )}
                                <h2>{paginatedArticles[0].headline}</h2>
                                <p className={styles.author}>{paginatedArticles[0].author} | {paginatedArticles[0].date}</p>
                                <p className={styles.body}>{paginatedArticles[0].body ? paginatedArticles[0].body.substring(0, 150) : ''}...</p>
                                <Link to={`/blog/${paginatedArticles[0].id}`}>Read Full Article</Link>
                                {/* ... rest of your featured content */}
                            </article>

                            {/* THE RED LINE */}
                            <div className={styles.fullWidthDivider} />

                            {/* Remaining Articles */}
                            {paginatedArticles.slice(1).map((article) => (
                                <article key={article.id} className={styles.articleCard}>
                                    {article.imageId && (
                                        <img
                                            src={`https://picsum.photos/400/200?random=${article.id}`}
                                            alt={article.headline}
                                            className={styles.articleCardImg}
                                            loading="lazy"
                                        />
                                    )}
                                    <h2>{article.headline}</h2>
                                    <p className={styles.author}>{article.author} | {article.date}</p>
                                    <p className={styles.body}>{article.body ? article.body.substring(0, 150) : ''}...</p>
                                    <Link to={`/blog/${article.id}`}>Read Full Article</Link>
                                </article>
                            ))}

                        </>

                        // paginatedArticles.map((article, index) => (
                        //     <article
                        //         key={article.id}
                        //         className={index === 0 ? styles.featuredCard : styles.articleCard}
                        //     >
                        //         {article.imageId && (
                        //             <img
                        //                 src={`https://picsum.photos/id/${article.imageId}/400/200`}
                        //                 alt={article.headline}
                        //                 style={{ width: '100%', borderRadius: '8px' }}
                        //             />
                        //         )}
                        //         <h2>{article.headline}</h2>
                        //         <p className={styles.author}>{article.author} | {article.date}</p>
                        //         <p className={styles.body}>
                        //             {/* Check if body exists before substring to avoid errors */}
                        //             {article.body ? article.body.substring(0, 150) : ''}...
                        //         </p>
                        //         <Link to={`/blog/${article.id}`}>Read Full Article</Link>
                        //     </article>
                        // ))


                    ) : (
                        <div className={styles.noResults}>
                            <h2>No Articles Found</h2>
                            <p>Sorry, we couldn't find any articles matching "{searchTerm}".</p>
                            <button onClick={() => window.location.reload()} className={styles.clearSearch}>Clear Search</button>
                        </div>
                    )}
                    {/* Pagination Controls */}
                    {displayArticles.length > 0 && (
                        <div className={styles.pagination}>
                            <button
                                className={styles.paginationButton}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>

                            <button
                                className={styles.paginationButton}
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

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