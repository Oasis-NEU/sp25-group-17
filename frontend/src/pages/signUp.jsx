import './SignUp.css';
import bucketImage from "../assets/Component 6.png";

function SignUp() {
  return (
    <div className="container">
      <h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">Sign up to Create an Account!</h2>
      <img 
                          src={bucketImage} 
                          alt="Bucket Image" 
                          className="image"
                        />
      <div className="form">
        <input type="text" placeholder="Full Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="text" placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <input type="password" placeholder="Confirm Password" className="input" />
        <button className="button">Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;