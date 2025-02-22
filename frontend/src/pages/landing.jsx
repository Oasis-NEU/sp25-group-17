import './Landing.css';
import BucketImg from '../assets/Component 6.png';


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
        <button className={"loginButton"}>Log In</button>
        <button className={"SignUpButton"}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;