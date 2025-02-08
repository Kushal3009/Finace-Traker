import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SingUpPage from './pages/SingUpPage';

function App() {
  return (
    <div>
      <NavBar /> {/* NavBar does not need to wrap with Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
