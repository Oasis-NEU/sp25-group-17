import React, { useState } from "react";
import "./recommendationsStyles.css"; 

function Recommendations() {
    // State for new item input and bucket list
    const [newItem, setNewItem] = useState("");
    const [bucketList, setBucketList] = useState([]);

    // Preset items
    const presetItems = [
        "Sky Diving",
        "Travel to Paris",
        "Go on a Cruise",
        "Try Scuba Diving",
        "Visit Japan",
        "Hike Mount Everest",
        "Learn to Surf",
        "Visit the Grand Canyon",
        "Watch Northern Lights",
    ];

    // State for clicked buttons
    const [clickedButtons, setClickedButtons] = useState(new Set());

    // Function to handle adding a new item
    const handleAddItem = () => {
        if (newItem.trim() !== "") {
            setBucketList([...bucketList, newItem]);
            setNewItem(""); 
        }
    };

    // Function to toggle button highlight
    const handleButtonClick = (index, isCustom) => {
        const key = isCustom ? `custom-${index}` : `preset-${index}`;
        setClickedButtons((prev) => {
            const updated = new Set(prev);
            if (updated.has(key)) {
                updated.delete(key); 
            } else {
                updated.add(key); 
            }
            return updated;
        });
    };

    // Function to handle delete of custom items
    const handleDeleteItem = (index) => {
        setBucketList(bucketList.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="container">
                <div className="blue-box">
                    <div className="box">
                        <h1 className="heading">Add some items to your bucket list!</h1>

                        {/* Grid container for displaying items */}
                        <div className="grid-container">
                            {/* Preset items */}
                            {presetItems.map((item, index) => (
                                <button
                                    key={`preset-${index}`}
                                    className={`blue-button ${
                                        clickedButtons.has(`preset-${index}`) ? "clicked" : ""
                                    }`}
                                    onClick={() => handleButtonClick(index, false)}
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Custom items */}
                            {bucketList.map((item, index) => (
                                <div className="custom-item" key={`custom-${index}`}>
                                    <button
                                        className={`blue-button ${
                                            clickedButtons.has(`custom-${index}`) ? "clicked" : ""
                                        }`}
                                        onClick={() => handleButtonClick(index, true)}
                                    >
                                        {item}
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteItem(index)}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Input container for adding new items */}
                        <div className="input-container">
                            <h2>Add your own items!</h2>
                            <input
                                type="text"
                                placeholder="Enter a new item..."
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                className="text-input"
                            />
                            <button onClick={handleAddItem} className="blue-button-add-button">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommendations;