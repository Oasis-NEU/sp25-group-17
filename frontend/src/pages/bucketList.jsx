import { useState } from "react";
import bucketImage from "../assets/Component 6.png"; // Ensure this path is correct
import "./BucketList.css";

const BucketList = () => {
  const [items, setItems] = useState(["Skydiving", "Visit Japan", "Learn Surfing"]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    const trimmedItem = newItem.trim();
    if (trimmedItem !== "") {
      setItems([...items, trimmedItem]);
      setNewItem("");
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
        {items.map((item, index) => (
          <li key={index} className="bucket-item">{item}</li>
        ))}
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
          onClick={handleAddItem} 
          className="add-button1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default BucketList;

