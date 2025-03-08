import { useState, useEffect } from "react";
import bucketImage from "../assets/Component 6.png"; 
import "./BucketList.css";
import { supabase } from "../supabase";

const BucketList = () => {
  const [bucketItems, setBucketItems] = useState([]); 
  const [newItem, setNewItem] = useState(""); 
  const [username] = useState("username"); 

  // Function to fetch items from the Supabase table
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from("Bucket List Items")
        .select("*");
      if (error) throw error;
      console.log("Fetched items:", data);
      setBucketItems(data); 
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  // Add a new item to the Supabase database
  const addItem = async () => {
    if (newItem.trim() === "") return; 

    try {
      const { data, error } = await supabase
        .from("Bucket List Items")
        .insert({ bucket_item: newItem, username: username })
        .single();

      if (error) throw error;
      
      console.log("Added item:", data); 
      fetchItems();
      setNewItem(""); // Clear the input field
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  // Fetch the items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // This will re-render the list of bucket items
  return (
    <div className="bucket-container flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-white text-2xl font-semibold mb-4">My Bucket List</h1>
      <img 
        src={bucketImage} 
        alt="Bucket List" 
        className="bucket-img mb-4"
      />

      <ul className="bucket-list w-full max-w-md p-4 rounded-lg">
        {}
        {bucketItems.length > 0 ? (
          bucketItems.map((item, index) => (
            item && item.bucket_item ? (
              <li key={index} className="bucket-item">{item.bucket_item}</li>
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


