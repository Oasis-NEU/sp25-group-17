import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "./UserProfile.css";

function UserProfile() {
  const { userId } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data, error } = await supabase
          .from("User Information")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>
      <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${profile.email}`} className="email-link">
          {profile.email}
        </a>
      </p>
      <p><strong>Location:</strong> {profile.location || "Unknown"}</p>
      <p><strong>School:</strong> {profile.school || "Not provided"}</p>
    </div>
  );
}

export default UserProfile;