import './SignUp.css';
import bucketImage from "../assets/Component 6.png";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  

  return (
    <div className="container">
      <h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">Sign up to Create an Account!</h2>
      <img 
                          src={bucketImage} 
                          alt="Bucket Image" 
                          className="image"
                        />
      <form className="form1" onSubmit={handleSignUp}>
        <input type="text" placeholder="Full Name" className="input" required />
        <input type="email" placeholder="Email" className="input" required />
        <input type="text" placeholder="Username" className="input" required />
        <input type="password" placeholder="Password" className="input" required/>
        <input type="password" placeholder="Confirm Password" className="input" required />
        <button type="submit" className="button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;