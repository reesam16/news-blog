import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import SearchBar from '../Search/SearchBar';

const Navbar = ({ setSearchTerm }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <Link to="/" className={styles.navLink} onClick={() => setSearchTerm('')}>
                    Home
                </Link>
                <Link to="/admin" className={styles.navLink}>Admin</Link>
            </div>
            <div className={styles.searchWrapper}>
                <SearchBar onSearch={setSearchTerm} />
            </div>
        </nav>
    );
};

export default Navbar;