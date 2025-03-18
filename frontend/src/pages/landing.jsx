import './Landing.css';
import BucketImg from '../assets/Component 6.png';
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();

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
        <button className={"loginButton"} onClick={() => navigate('/login')}>Log In</button>
        <button className={"SignUpButton"} onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;