import './LogIn.css';

function LogIn() {
  return (
    <div className="container">
      <h1 className="message">Log in with username/password!</h1>
      <img 
        src="https://img.freepik.com/premium-vector/hand-drawn-kids-drawing-cartoon-vector-illustration-cute-plastic-buckets-with-water-icon-isolated_760559-818.jpg?semt=ais_hybrid" 
        alt="Bucket Image"
        className="image"
      />
      <div className="form">
        <input type="text" placeholder="Username" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <button className="button">Log In</button>
      </div>
    </div>
  );
}

export default LogIn;