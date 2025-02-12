import './Landing.css';


function Landing() {
  return (
    <div className={"container"}>
      <h1 className={"message"}>Welcome to Bucket Buddies!</h1>
      <p className={"subtitle"}>
        A place where you can find a buddy
        <br />
        to complete your bucket list
      </p>  
      <img 
        src="https://img.freepik.com/premium-vector/hand-drawn-kids-drawing-cartoon-vector-illustration-cute-plastic-buckets-with-water-icon-isolated_760559-818.jpg?semt=ais_hybrid" 
        alt="Bucket Image"
        className={"image"}
      />
      <div className={"buttonContainer"}>
        <button className={"loginButton"}>Log In</button>
        <button className={"SignUpButton"}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;
