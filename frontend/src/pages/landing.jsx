// write java script and html at the same time 

function App() {
    return (
      <div style={styles.container}>
        <h1 style={styles.message}>Welcome to Bucket Buddies!</h1>
        <p style={styles.subtitle}>
          A place where you can find a buddy
          <br />
          to complete your bucket list
        </p>  
        <img 
          src="https://img.freepik.com/premium-vector/hand-drawn-kids-drawing-cartoon-vector-illustration-cute-plastic-buckets-with-water-icon-isolated_760559-818.jpg?semt=ais_hybrid" 
          alt="Bucket Image"
          style={styles.image}
        />
        <div style={styles.buttonContainer}>
        <button style={styles.loginButton}>Log In</button>
        <button style={styles.signupButton}>Sign Up</button>
        </div>
        </div>
    );
  }
  
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      flexDirection: "column", 
      position: "relative",
    },
    message: {
      fontSize: 65,
      color: "#333",
      marginTop: "-300px",
    },
    subtitle: {
      fontSize: 38, 
      color: "#555",
      textAlign: "center", 
      marginTop: "20px", 
      left: "80px",
      position: "absolute",
    },
  
    image: {
      maxWidth: "150px", 
      height: "auto",
      top: "500px",
      left: "260px",
      position: "absolute",
  
    },
  
    buttonContainer: {
      marginTop: "200px", 
      display: "flex",
      flexDirection: "column", 
      alignItems: "flex-end", 
      position: "absolute",
      right: "250px", 
    },
  
    loginButton: {
      backgroundColor: "#4CAF50", 
      color: "white",
      padding: "15px 37px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "100px", 
      transition: "background-color 0.3s ease",
    },
  
    signupButton: {
      backgroundColor: "#008CBA", 
      color: "white",
      padding: "15px 32px",
      fontSize: "16px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    },
  };
  
  
  export default App;