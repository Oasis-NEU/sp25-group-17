import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "./Profile.css";
import ProfileImg from "../assets/Profile Icon.png";

function Profile() {
    const [profile, setProfile] = useState({
        fullName: "",
        username: "", 
        birthday: null,
        email: "",
        phoneNumber: "",
        school: "",
        location: "",
    });

    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    async function fetchProfile() {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("No user logged in.");
                return;
            }

            setUserId(user.id);

            const { data, error } = await supabase
                .from("User Information") 
                .select("*")
                .eq("user_id", user.id)
                .maybeSingle(); 
            
            if (error) throw error;
            if (!data) {
                console.warn("No profile found for user. It may not be created yet.");
                return; 
            }
            console.log("Fetched profile data:", data);

            setProfile({
                fullName: `${data.first_name} ${data.last_name}`,
                username: data.username,
                birthday: data.birthday,
                email: data.email,
                phoneNumber: data.phone_number,
                school: data.school,
                location: data.location,
            });
        } catch (error) {
            console.error("Error fetching profile: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function fetchSession() {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                fetchProfile();
            }
        }

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchProfile(); 
            } else {
                setProfile({ fullName: "", username: "", birthday: null, email: "", phoneNumber: "", school: "", location: "" }); // Reset profile
            }
        });

        return () => {
            if (subscription?.unsubscribe) {
                subscription.unsubscribe();
            }
        };
    }, []);

    async function updateProfile() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("No user logged in.");
            return;
        }

        try {
            const [firstName, lastName = ""] = profile.fullName.split(" ");
        
            const { error } = await supabase
                .from("User Information") 
                .update({
                    first_name: firstName || "",
                    last_name: lastName || "",
                    username: profile.username,
                    birthday: profile.birthday,
                    email: profile.email,
                    phone_number: profile.phoneNumber,
                    school: profile.school,
                    location: profile.location,
                })
                .eq("user_id", user.id);

            if (error) throw error;
            console.log("user info:", user);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error.message);
        } 
    }

    return (
        <div className="container1">
            <h1 className="message2">Your Profile</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="input1" 
                        value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="input1" 
                        value={profile.username}
                        onChange={(e) => setProfile({...profile, username: e.target.value })} 
                    />
                    <input 
                        type="date" 
                        placeholder="Birthday" 
                        className="input1" 
                        value={profile.birthday}
                        onChange={(e) => setProfile({...profile, birthday: e.target.value })} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="input1" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="input1" 
                        value={profile.phoneNumber}
                        onChange={(e) => setProfile({...profile, phoneNumber: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="School/University" 
                        className="input1" 
                        value={profile.school}
                        onChange={(e) => setProfile({...profile, school: e.target.value })} 
                    />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        className="input1" 
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value })} 
                    />
                    <button className="button1" onClick={updateProfile}>
                        Save Profile
                    </button>
                </div>
            )}

            <div className="image-container">
                <img 
                    src={ProfileImg} 
                    alt="Profile" 
                    className="profile-placeholder"
                />
            </div>
        </div>
    );
}

export default Profile;
