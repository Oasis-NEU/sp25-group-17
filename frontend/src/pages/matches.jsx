import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Matches.css";

const Matches = () => {
  const [matches, setMatches] = useState([
    { name: "Anya", bucketList: ["Skydiving", "Visit Japan", "Rock Climbing"], isConnected: false },
    { name: "Koena", bucketList: ["Learn Surfing", "Travel to Italy", "Visit Italy"], isConnected: false },
    { name: "Kalina", bucketList: ["Climb Everest", "Go scuba diving", "Cliff Jumping"], isConnected: false },
    {name: "Divya", bucketList: ["Visit Japan", "Go scuba diving", "Ice skating"], isConnected: false},
    {name: "Rob", bucketList: ["Skydiving", "Visit Japan", "Climb Everest"], isConnected:false}
  ]);

  const [filter, setFilter] = useState("");

  const handleConnect = (index) => {
    const updatedMatches = [...matches];
    updatedMatches[index].isConnected = !updatedMatches[index].isConnected;
    setMatches(updatedMatches);
  };

  const filteredMatches = matches.filter(match => 
    match.name.toLowerCase().includes(filter.toLowerCase()) ||
    match.bucketList.some(item => item.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="matches-container"> {/* Change from matches-page to matches-container */}
      <h2>Your Matches</h2>
      
      <input 
        type="text" 
        className="filter-input"  // Add correct class from CSS
        placeholder="Search by name or activity" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      
      <div className="matches-list">
        {filteredMatches.map((match, index) => (
          <div key={index} className="match-item">
            <strong>{match.name}</strong>
            <ul>
              {match.bucketList.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
            <button className="heart-button" onClick={() => handleConnect(index)}>
              {match.isConnected ? <FaHeart className="heart liked" /> : <FaRegHeart className="heart" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Matches;
