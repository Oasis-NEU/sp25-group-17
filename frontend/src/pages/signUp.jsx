import './SignUp.css';

function SignUp() {
  return (
    <div className="container">
      <h1 className="message">Sign up to Create an Account!</h1>
      <img 
        src="https://img.freepik.com/premium-vector/hand-drawn-kids-drawing-cartoon-vector-illustration-cute-plastic-buckets-with-water-icon-isolated_760559-818.jpg?semt=ais_hybrid" 
        alt="Bucket Image"
        className="image"
      />
      <div className="form">
        <input type="text" placeholder="First Name" className="input" />
        <input type="text" placeholder="Last Name" className="input" />
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