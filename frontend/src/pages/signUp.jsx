import './SignUp.css';
import bucketImage from "../assets/Component 6.png";
import React, { useState } from "react";
import { supabase } from "../supabase";

function SignUp() {
  const [userData, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function createUser() {
    const { username, email, first_name, last_name, password, confirmPassword } = userData;

    if (!username || !email || !first_name || !last_name || !password) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { userData, error } = await supabase
        .from("User Information")
        .insert({
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: password
        })
        .single();
        if (error) {
          // Check for specific error messages
          if (error.message.includes("User Information_email_key")) {
            alert("Error creating user: Account with this email already exists");
          } else if (error.message.includes("Information_username_key")) {
            alert("Error creating user: Account with this username already exists");
          } else {
            alert("Error creating user: " + error.message);
          }
        } else {
          // Only alert on success if no errors were returned
          alert("Profile Successfully Created!");
        }
      
    } catch (error) {
      
      console.error("Error creating user:", error.message);
    }
    
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
      <div className="form1">
        <input 
        name="first_name"
        value={userData.first_name}
        onChange={(e) => handleChange(e)} 
          type="text"
          placeholder="First Name"
          className="input" />
        <input 
        name="last_name"
        value={userData.last_name}
        onChange={(e) => handleChange(e)} 
          type="text"
          placeholder="Last Name"
          className="input" />
        <input 
        name="email"
        value={userData.email}
        onChange={(e) => handleChange(e)} 
        type="email" placeholder="Email" className="input" />
        <input 
        name="username"
        value={userData.username}
        onChange={(e) => handleChange(e)} 
        type="text" placeholder="Username" className="input" />
        <input 
        name="password"
        value={userData.password}
        onChange={(e) => handleChange(e)} 
        type="password" placeholder="Password" className="input" />
        <input 
        name="confirmPassword"
        value={userData.confirmPassword}
        onChange={(e) => handleChange(e)} 
        type="password" placeholder="Confirm Password" className="input" />
        <button
          onClick={createUser}
          className="button">Sign Up</button>
      </div>
    </div>
  );
}

export default SignUp;