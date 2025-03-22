import { useState, useEffect } from "react";
import bucketImage from "../assets/Component 6.png";
import "./BucketList.css";
import { supabase } from "../supabase";

function BucketList() {
  const [newItem, setNewItem] = useState("");
  const [userId, setUserId] = useState(null);
  const [bucketItems, setBucketItems] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id); // Store the user ID
        // fetchItems(user.id); // Fetch their bucket list items
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchItems(userId);
    }
  },
    [userId]);

  // Add a new item to the Supabase database
  async function addItem() {
    if (newItem.trim() === "" || !userId) return;


    try {
      const { data, error } = await supabase
        .from("Bucket List Items")
        .insert({ bucket_item: newItem, user_ID: userId });

      if (error) throw error;

      console.log("Added item:", data);
      fetchItems(userId);
      setNewItem(""); // Clear the input field
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  async function removeItem(itemText) {
    console.log("Attempting to delete item:", itemText);
  
    try {
      // Fetch the item ID that belongs to the logged-in user
      const { data: items, error: fetchError } = await supabase
        .from("Bucket List Items")
        .select("ID")  // Fetch only the ID
        .eq("user_ID", userId)  // Ensure it belongs to the logged-in user
        .eq("bucket_item", itemText)  // Match the exact item text
        .limit(1);  // Only fetch one record to avoid deleting duplicates
  
      if (fetchError) throw fetchError;
  
      if (!items || items.length === 0) {
        console.warn("Item not found:", itemText);
        return;
      }
  
      const itemId = items[0].ID;  // Get the item's unique ID
  
      // Now delete using the ID
      const { error: deleteError } = await supabase
        .from("Bucket List Items")
        .delete()
        .eq("ID", itemId);  // Delete by the unique ID
  
      if (deleteError) throw deleteError;
  
      console.log(`Successfully deleted: ${itemText}`);
      
      
      fetchItems(userId); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  }
  

  // Function to fetch items from the Supabase table
  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from("Bucket List Items")
        .select("*")
        .eq("user_ID", userId);
      if (error) throw error;
      console.log("Fetched items:", data);
      setBucketItems(data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };


  return (
    <div className="bucket-container flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-white text-2xl font-semibold mb-4">My Bucket List</h1>
      <img
        src={bucketImage}
        alt="Bucket List"
        className="bucket-img mb-4"
      />

      <ul className="bucket-list w-full max-w-md p-4 rounded-lg">
        {bucketItems.length > 0 ? (
          bucketItems.map((item, index) => (
            item && item.bucket_item ? (
              <li key={index} className="bucket-item">{item.bucket_item}
                <button
                  onClick={() => removeItem(item.bucket_item)}
                  className="delete-button ml-4 text-red-500 font-bold"
                >
                  ✖
                </button>
              </li>

            ) : (
              <li key={index} className="bucket-item">Invalid item</li>
            )
          ))
        ) : (
          <p>No items in your bucket list yet!</p>
        )}
      </ul>

      <div className="input-container mt-4 flex gap-3">
        <input
          type="text"
          className="input-box"
          placeholder="Add an item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          onClick={addItem}
          className="add-button1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default BucketList;


