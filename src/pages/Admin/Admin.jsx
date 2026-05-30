import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { Link } from 'react-router-dom';


const rules = [
    { isValid: (post) => post.headline.trim().length >= 3, msg: 'Headline must be at least 3 characters.' },
    { isValid: (post) => post.author.trim().length >= 2, msg: 'Author name must be at least 2 characters.' },
    { isValid: (post) => post.body.trim().length >= 20, msg: 'Body must be at least 20 characters long.' },
    // { isValid: (post) => post.imageId.trim().length > 0, msg: 'Please provide an Image ID.' }
];



const Admin = () => {
    const [post, setPost] = useState({ headline: '', author: '', body: '', imageId: '' });
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem('tempPosts')) || [];
        setSavedPosts(posts);
    }, []);

    const [editingId, setEditingId] = useState(null);
    const handleEdit = (postToEdit) => {
        setEditingId(postToEdit.id);
        setPost({
            headline: postToEdit.headline,
            author: postToEdit.author,
            body: postToEdit.body,
            imageId: postToEdit.imageId
        });
    };

    const handleDelete = (id) => {
        const filtered = savedPosts.filter(p => p.id !== id);
        localStorage.setItem('tempPosts', JSON.stringify(filtered));
        setSavedPosts(filtered);
    };

    const [status, setStatus] = useState({ type: '', messages: [] });

    const handleSubmit = () => {

        const failingRules = rules.filter(rule => !rule.isValid(post));

        if (failingRules.length > 0) {
            // Correctly set the status messages here
            setStatus({ type: 'error', messages: failingRules.map(r => r.msg) });
            return;
        }

        // Reset status on success
        setStatus({ type: '', messages: [] });

        if (editingId) {
            // Update existing
            const updatedPosts = savedPosts.map(p =>
                p.id === editingId
                    ? { ...post, id: editingId, date: p.date } : p
            );
            localStorage.setItem('tempPosts', JSON.stringify(updatedPosts));
            setSavedPosts(updatedPosts);
            setEditingId(null); // Reset editing mode
            // alert("Post updated!");
            setStatus({ type: 'success', messages: ['Post updated successfully!'] });
        } else {
            // Create new
            const newPost = {
                ...post,
                id: Date.now(),
                date: new Date().toLocaleDateString()
            };
            const updatedPosts = [...savedPosts, newPost];
            localStorage.setItem('tempPosts', JSON.stringify(updatedPosts));
            setSavedPosts(updatedPosts);
            // alert("Post saved!");
            setStatus({ type: 'success', messages: ['Post saved successfully!'] });
        }
        setPost({ headline: '', author: '', body: '', imageId: '' });
        setTimeout(() => {
            setStatus({ type: '', messages: [] });
        }, 3000);
    };

    return (
        <div className={styles.adminContainer}>
            <section className={styles.editor}>
                <h2>Create New Post</h2>
                <div className={styles.formGroup}>
                    <input
                        value={post.headline}
                        placeholder="Headline"
                        onChange={(e) => setPost({ ...post, headline: e.target.value })} />
                    <input
                        value={post.author}
                        placeholder="Author"
                        onChange={(e) => setPost({ ...post, author: e.target.value })} />
                    <input
                        value={post.imageId}
                        placeholder="Image ID (e.g., 10)"
                        onChange={(e) => setPost({ ...post, imageId: e.target.value })} />
                    <textarea
                        value={post.body}
                        placeholder="Body text..."
                        onChange={(e) => setPost({ ...post, body: e.target.value })} />
                    {/* <button onClick={handleSubmit}>Publish Post</button> */}
                    <button onClick={handleSubmit}>
                        {editingId ? "Update Post" : "Publish Post"}
                    </button>
                    {editingId && (
                        <button onClick={() => {
                            setEditingId(null);
                            setPost({ headline: '', author: '', body: '', imageId: '' });
                        }}>
                            Cancel Edit
                        </button>
                    )}

                    {/* Error Display */}

                    {status.messages.length > 0 && (
                        <div className={status.type === 'error' ? styles.errorBox : styles.successBox}>
                            {status.messages.map((msg, index) => (
                                <p key={index} style={{ color: status.type === 'error' ? 'red' : 'green' }}>
                                    {msg}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

            </section>
            <h2>Manage Posts</h2>
            <section className={styles.preview}>

                {savedPosts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#888' }}>No posts yet. Create your first one above!</p>
                ) : (
                    [...savedPosts]
                        .sort((a, b) => b.id - a.id)
                        .map(p => (
                            <div key={p.id} className={styles.previewCard}>
                                <div>
                                    <h3>{p.headline}</h3>
                                    <p className={styles.author}>
                                        {p.author || "Author Name"} | {p.date}
                                    </p>
                                    <Link to={`/blog/${p.id}`}>Read Full Article</Link>
                                    <p>{p.body ? p.body.substring(0, 50) : ""}...</p>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button onClick={() => handleEdit(p)}>Edit</button>
                                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                                </div>

                            </div>
                        ))
                )}
            </section>
        </div>
    );
};

export default Admin;