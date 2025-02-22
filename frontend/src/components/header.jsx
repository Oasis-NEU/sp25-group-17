import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file
import bucketImage from "../assets/Component 6.png"; // Ensure this path is correct


function Header() {
  return (
    <nav className="Header">
      <div className="nav-container">
        {/* Logo */}
       <img 
               src={bucketImage} 
               alt="Bucket List" 
               className="bucket-img mb-4"
             />

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/mybucket">My Bucket</Link></li>
          <li><Link to="/matches">Matches</Link></li>
          <li><Link to="/messages">Messages</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
