import './messages.css';
import bucketImage from "../assets/Component 6.png";
import { BiRadioCircle } from 'react-icons/bi';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { supabase } from "../supabase";
 

function messages() {
  
  return (
    <div className="container">
      {/* <img
        src={bucketImage}
        alt="Bucket Image"
        className="image"
      /> */}
      //<h1 className="title">Bucket Buddies</h1>
      <h2 className="message1">This Page has not been created yet!</h2>
     
    </div>
  );
}

export default messages;