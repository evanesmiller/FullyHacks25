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
          <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/about">About</Link>
          <Link onClick={() => setIsOpen(false)} to="/livecam">Live Cam</Link>
          <Link onClick={() => setIsOpen(false)} to="/chatbot">Chatbot</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
