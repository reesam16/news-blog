import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue); // Send to App.jsx
            setInputValue('');    // Clear the field immediately
        }
    };

    return (
        <input 
            type="text" 
            placeholder="Search Archives..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
        />
    );
};

export default SearchBar;