import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import SearchBar from '../Search/SearchBar';

const Navbar = ({ setSearchTerm }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            {/* The original structure you liked */}
            <div className={styles.navLinks}>
                <Link to="/" className={styles.navLink} onClick={() => setSearchTerm('')}>
                    Home
                </Link>
                <Link to="/contact" className={styles.navLink}>Contact</Link>
                <Link to="/admin" className={styles.navLink}>Admin</Link>
            </div>

            <div className={styles.searchWrapper}>
                <SearchBar onSearch={setSearchTerm} />
            </div>

            {/* The new Hamburger Button - only visible on mobile */}
            <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? '✕' : '≡'}
            </button>

            {/* The Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link to="/" className={styles.navLink} onClick={() => { setSearchTerm(''); setIsMenuOpen(false); }}>Home</Link>
                    <Link to="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <SearchBar onSearch={(term) => { setSearchTerm(term); setIsMenuOpen(false); }} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;



