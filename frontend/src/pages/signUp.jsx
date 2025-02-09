// write java script and html at the same time 

function App() {
    return (
      <div style={styles.container}>
        <h1 style={styles.message}>Sign up to Create an Account!</h1>
        <img 
          src="https://img.freepik.com/premium-vector/hand-drawn-kids-drawing-cartoon-vector-illustration-cute-plastic-buckets-with-water-icon-isolated_760559-818.jpg?semt=ais_hybrid" 
          alt="Bucket Image"
          style={styles.image}
        />
        <div style={styles.form}>
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="text" placeholder="Username" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <input type="password" placeholder="Confirm Password" style={styles.input} />
          <button style={styles.button}>Sign Up</button>
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
      fontSize: 50,
      color: "#333",
      marginBottom: "20px",
    },
    image: {
      maxWidth: "150px", 
      height: "auto",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      maxWidth: "300px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#008CBA",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }
  };
  
  export default App;
  