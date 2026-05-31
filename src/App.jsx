import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import BlogPost from './pages/Blog/BlogPost'; //  where you'll build the full view
import Admin from './pages/Admin/Admin';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Router>
            <div className="app-wrapper">
                <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>

                <Routes>
                    <Route path="/" element={<Home searchTerm={searchTerm} />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
