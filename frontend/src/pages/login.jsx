import './LogIn.css';
import bucketImage from "../assets/Component 6.png";
import { BiRadioCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/mybucket');
  };

  return (
    <div className="container">
      <img 
                    src={bucketImage} 
                    alt="Bucket Image" 
                    className="image"
                  />
      <h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">Log in with username and password!</h2>
      <div className="form" onSubmit={handleLogin}>
        <input type="text" placeholder="Username" className="input" required />
        <input type="password" placeholder="Password" className="input" required />
        <button type="submit" className="button">Log In</button>
      </div>
    </div>
  );
}

export default LogIn;