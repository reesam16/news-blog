import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Contact.module.css';

function Contact() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '', email: '', confirmEmail: '', subject: '', message: ''
    });

    const [status, setStatus] = useState({ type: '', messages: [] });
    const [isSending, setIsSending] = useState(false);

    const [savedMessages, setSavedMessages] = useState([]);

    // Refresh the list whenever a message is added
    useEffect(() => {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        setSavedMessages(messages);
    }, [status]); // Re-runs when status changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // CUSTOM RULES
        const rules = [
            { isValid: formData.name.length > 2, msg: 'Please enter a name (at least 2 characters).' },
            { isValid: formData.email.includes('@') && formData.email.includes('.'), msg: 'Please enter a valid email' },
            { isValid: formData.email.trim().toLowerCase() === formData.confirmEmail.trim().toLowerCase(), msg: 'Email addresses do not match. Please check for typos!' },
            { isValid: formData.subject.length > 2, msg: 'Subject is required.' },
            { isValid: formData.message.length >= 10, msg: 'Please use more than 10 characters.' }
            // Note: Changed from your JS comment of 50 to match the code logic of 10
        ];

        const errors = rules.filter(rule => !rule.isValid).map(rule => rule.msg);

        if (errors.length > 0) {
            setStatus({ type: 'error', messages: errors });
            return;
        }

        setIsSending(false);

        // SAVING TO LOCAL STORAGE
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        const newMessage = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };

        localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));

        setStatus({ type: 'success', messages: ["Message saved locally to your browser!"] });
        setFormData({ name: '', email: '', confirmEmail: '', subject: '', message: '' });
    };

    const deleteMessage = (id) => {
        // Filter out the message that matches the ID
        const updatedMessages = savedMessages.filter(msg => msg.id !== id);

        // Save the new array back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

        // Update local state to reflect the change immediately
        setSavedMessages(updatedMessages);
    };

    return (
        <main className={styles['form-outer-container']}>
            <div className={styles['form-container']}>
                <h2 className={styles['form-title']}>Contact Me</h2>
                <form className={styles['contact-form']} onSubmit={handleSubmit} noValidate>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Your Name</label>
                        <input type="text" name="name" className={styles['form-input']}
                            value={formData.name} onChange={handleChange} placeholder="Name" />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Your Email</label>
                        <input type="email" name="email" className={styles['form-input']}
                            value={formData.email} onChange={handleChange} placeholder="email@mail.com" />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Confirm Your Email</label>
                        <input type="email" name="confirmEmail" className={styles['form-input']}
                            value={formData.confirmEmail} onChange={handleChange} placeholder="email@mail.com" />
                    </div>

                    <div className={styles['form-group']}>
                        <label className={styles['form-label']}>Subject</label>
                        <input type="text" name="subject" className={styles['form-input']}
                            value={formData.subject} onChange={handleChange} placeholder="Inquiry about..." />
                    </div>

                    <div className={styles['form-group-last']}>
                        <label className={styles['form-label']}>Your Message</label>
                        <textarea name="message" rows="10" className={styles['form-input']}
                            value={formData.message} onChange={handleChange} placeholder="Your message here..." />
                    </div>

                    <div className={styles['button-container']}>
                        <button type="submit" className={styles['submit-button']} disabled={isSending}>
                            {isSending ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status.messages.length > 0 && (
                        <div className={styles['message-box']} style={{ color: status.type === 'error' ? 'red' : 'green' }}>
                            <ul>
                                {status.messages.map((m, i) => <li key={i}>{m}</li>)}
                            </ul>
                        </div>
                    )}
                </form>
                <div className={styles['message-history']}>
                    <h3>Previous Messages (Local)</h3>
                    {savedMessages.map((msg) => (
                        <div key={msg.id} className={styles['message-card']}>
                            <strong>{msg.subject}</strong> | {msg.name} ({msg.date})
                            <p>{msg.message}</p>

                            {/* Add this button */}
                            <button
                                className={styles['delete-button']}
                                onClick={() => deleteMessage(msg.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Contact;