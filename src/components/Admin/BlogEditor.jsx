import { useState } from 'react';
import styles from './AdminForm.module.css';

const BlogEditor = () => {
    const [post, setPost] = useState({ headline: '', author: '', body: '', imageId: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem('tempPosts')) || [];
        const newPost = { ...post, id: Date.now() }; // Unique ID
        localStorage.setItem('tempPosts', JSON.stringify([...existing, newPost]));
        alert("Post saved successfully!");
        setPost({ headline: '', author: '', body: '', imageId: '' }); // Clear form
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder="Headline" value={post.headline} onChange={(e) => setPost({...post, headline: e.target.value})} />
            <input placeholder="Author" value={post.author} onChange={(e) => setPost({...post, author: e.target.value})} />
            <input placeholder="Image ID (e.g., 10)" value={post.imageId} onChange={(e) => setPost({...post, imageId: e.target.value})} />
            <textarea placeholder="Body" value={post.body} onChange={(e) => setPost({...post, body: e.target.value})} />
            <button type="submit">Save Post</button>
        </form>
    );
};

export default BlogEditor;