import './LogIn.css';
import bucketImage from "../assets/Component 6.png";
import { BiRadioCircle } from 'react-icons/bi';

function LogIn() {
  return (
    <div className="container">
      <img
        src={bucketImage}
        alt="Bucket Image"
        className="image"
      />
      <h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">Log in with username and password!</h2>
      <div className="form">
        <input type="text" placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <button className="button">Log In</button>
      </div>
    </div>
  );
}

export default LogIn;