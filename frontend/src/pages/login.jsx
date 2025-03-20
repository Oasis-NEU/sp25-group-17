import './LogIn.css';
import bucketImage from "../assets/Component 6.png";
import { BiRadioCircle } from 'react-icons/bi';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { supabase } from "../supabase";
 

function LogIn() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

  async function handleLogin() {
    console.log("Logging in with:", loginData);

    const { email, password } = loginData;

    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        alert(error.message);
        return;
      }


    alert("Login successful!");
    navigate("/matches");
  } catch(err){
    console.error("Login error:", err);
    alert("Something went wrong. Please try again later.");

  }
}



  

  return (
    <div className="container">
      <img
        src={bucketImage}
        alt="Bucket Image"
        className="image"
      />
      <h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">Log in with email and password!</h2>
      <div className="form">
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          className="input"
          value={loginData.email}
          onChange={handleChange} />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          className="input"
          value={loginData.password}
          onChange={handleChange} />
        <button 
          className="button" 
          onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default LogIn;

//   try {
  //     const { data, error } = await supabase
  //       .from("User Information")
  //       .select("*")
  //       .eq("username", username)
  //       .single();

  //     if (error || !data) {
  //       alert("Invalid username or password.");
  //       return;
  //     }

  //     if (data.password !== password) {
  //       alert("Incorrect password. Please try again.");
  //       return;
  //     }

  //     alert("Login successful!");
  //     navigate("/matches");

  //   } catch (error) {
  //     console.error("Error logging in:", error.message);
  //     alert("An error occurred while logging in.");
  //   }
  // }