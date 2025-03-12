import './Landing.css';
import BucketImg from '../assets/Component 6.png';
import { Link } from "react-router-dom";

function Landing() {
  
  return (
    
    <div className={"container"}>
      <img
        src={BucketImg}
        alt="Bucket Image"
        className="image"
      />
      <h1 className={"message"}>Bucket Buddies</h1>
      <p className={"subtitle"}>
        A place where you can find a buddy
        <br />
        to complete your bucket list!
      </p>
      <div className={"buttonContainer"}>
        <Link to="/login">
        <button className={"loginButton"}>Log In</button>
        </Link>
        <Link to="/signup">
          <button className={"SignUpButton"}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;