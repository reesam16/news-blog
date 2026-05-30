import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>© 2026 The Middle-earth Blog</p>
            <Link to="/admin" className={styles.adminLink}>Admin</Link>
        </footer>
    );
};

export default Footer;