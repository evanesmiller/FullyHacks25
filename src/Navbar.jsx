import { useState } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="menu">
            <a href="/">Home</a>
            <a href="/About">About</a>
            <a href="/Livecam">Live Cam</a>
            <a href="/Chatbot">Chatbot</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
