import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { supabase } from "../supabase";
import "./Matches.css";

function Matches() {
  const [userId, setUserId] = useState(null);
  const [bucketItems, setBucketItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBucketItems(userId);
    }
  }, [userId]);

  async function fetchBucketItems(userId) {
    try {
      const { data, error } = await supabase
        .from("Bucket List Items")
        .select("bucket_item")
        .eq("user_ID", userId);

      if (error) throw error;

      const items = data.map(item => item.bucket_item);
      setBucketItems(items);
      findMatches(items);
    } catch (error) {
      console.error("Error fetching bucket items:", error.message);
    }
  }

  async function findMatches(userBucketItems) {
    try {
      if (userBucketItems.length === 0) return;

      const { data, error } = await supabase
        .from("Bucket List Items")
        .select("user_ID, bucket_item");

      if (error) throw error;

      const matchesMap = new Map();

      data.forEach(item => {
        if (item.user_ID !== userId && userBucketItems.includes(item.bucket_item)) {
          if (!matchesMap.has(item.user_ID)) {
            matchesMap.set(item.user_ID, new Set());
          }
          matchesMap.get(item.user_ID).add(item.bucket_item);
        }
      });

      const matchedUsers = Array.from(matchesMap, ([id, items]) => ({
        userId: id,
        commonItems: Array.from(items),
      }));

      fetchUsernames(matchedUsers);
    } catch (error) {
      console.error("Error finding matches:", error.message);
    }
  }

  async function fetchUsernames(matchedUsers) {
    try {
      const userIds = matchedUsers.map(user => user.userId);
      if (userIds.length === 0) return;
  
      const { data, error } = await supabase
        .from("User Information")
        .select("user_id, first_name, last_name, username")
        .in("user_id", userIds);
  
      if (error) throw error;
  
      const userMap = new Map(data.map(user => [
        user.user_id,
        {
          fullName: `${user.first_name} ${user.last_name}`.trim(),
          username: user.username || "unknown",
        }
      ]));
  
      const updatedMatches = matchedUsers.map(user => ({
        userId: user.userId,
        fullName: userMap.get(user.userId)?.fullName || "Unknown User",
        username: userMap.get(user.userId)?.username || "unknown",
        commonItems: user.commonItems,
        isConnected: false,
      }));
  
      updatedMatches.sort((a, b) => b.commonItems.length - a.commonItems.length);
  
      setMatches(updatedMatches);
    } catch (error) {
      console.error("Error fetching usernames:", error.message);
    }
  }
  

  const handleConnect = (index) => {
    const updatedMatches = [...matches];
    updatedMatches[index].isConnected = !updatedMatches[index].isConnected;
    setMatches(updatedMatches);
  };

  const filteredMatches = matches.filter(match =>
    match.username.toLowerCase().includes(filter.toLowerCase()) ||
    match.commonItems.some(item => item.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="matches-container">
      <h2>Your Matches</h2>

      <input
        type="text"
        className="filter-input"
        placeholder="Search by name or activity"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

<div className="matches-list">
  {filteredMatches.length > 0 ? (
    filteredMatches.map((match, index) => (
      <div key={index} className="match-item">
        {/* Name and Username Section */}
        {/* Make the username clickable */}
        <div className="match-info">
          <strong className="match-name">{match.fullName}</strong>
          <Link to={`/profile/${match.userId}`}
          className="username-link"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Navigating to Profile:", match.userId);
          }}
          >
            @{match.username}</Link>
        </div>

        {/* Activities and Connect Button Section */}
        <div className="match-content">
          <div className="match-items">
            <ul>
              {match.commonItems.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>
          <button className="heart-button" onClick={() => handleConnect(index)}>
            {match.isConnected ? <FaHeart className="heart liked" /> : <FaRegHeart className="heart" />}
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No matches found yet.</p>
  )}
</div>


    </div>
  );
}

export default Matches;
