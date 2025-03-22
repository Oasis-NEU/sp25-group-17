import React from "react";
import { supabase } from "../supabase";
import "./recommendationsStyles.css";
import { useState, useEffect } from "react";

function Recommendations({ userID }) {
    const [userId, setUserId] = useState(null);
    const recommendedItems = [
        "Sky Diving",
        "Travel to Paris",
        "Go on a Cruise",
        "Try Scuba Diving",
        "Visit Japan",
        "Hike Mount Everest",
        "Learn to Surf",
        "Visit the Grand Canyon",
        "Watch Northern Lights",
        "Roller Skating",
        "Visit Greece",
        "Cliff Jumping",
        "Snorkeling",
        "Grand Canyon",
        "Jet Ski"
    ];

    useEffect(() => {
        async function fetchUser() {
          const { data: { user }, error } = await supabase.auth.getUser();
    
          if (error) {
            console.error("Error fetching user:", error.message);
            return;
          }
    
          if (user) {
            setUserId(user.id);
          }
        }
    
        fetchUser();
      }, []);
    
      const handleAddItem = async (item) => {
        if (!userId) {
          console.error("User ID is missing. Cannot add item.");
          return;
        }
    
        console.log(`Adding "${item}" for User ID: ${userId}`);
    
        try {
          const { error } = await supabase
            .from("Bucket List Items")
            .insert([{ user_ID: userId, bucket_item: item }]);
    
          if (error) throw error;
    
          console.log(`Successfully added "${item}" to the database`);
        } catch (error) {
          console.error("Error adding item:", error.message);
        }
      };
    
      return (
        <div className="recommendations-container">
            <div className="blue-box">
                <div className="box">
                    <h1 className="heading">Some Ideas for your Bucket List!</h1>

                    {/* Grid container for displaying items */}
                    <div className="grid-container">
                        {recommendedItems.map((item, index) => (
                            <button
                                key={`preset-${index}`}
                                className="blue-button"
                                onClick={() => handleAddItem(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    }

    export default Recommendations;