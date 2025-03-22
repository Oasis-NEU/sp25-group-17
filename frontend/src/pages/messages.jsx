import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "./Messages.css";

function Messages() {
  const [userId, setUserId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) fetchConnectedUsers();
  }, [userId]);

  async function fetchConnectedUsers() {
    try {
      const { data, error } = await supabase
        .from("Connections")
        .select("user2")
        .eq("user1", userId);

      if (error) throw error;

      const userIds = data.map(connection => connection.user2);
      if (userIds.length === 0) return;

      const { data: users, error: userError } = await supabase
        .from("User Information")
        .select("user_id, username")
        .in("user_id", userIds);

      if (userError) throw userError;

      setConnectedUsers(users);
    } catch (error) {
      console.error("Error fetching connected users:", error.message);
    }
  }

  async function fetchMessages(chatUserId) {
    try {
      setSelectedChat(chatUserId);
      const { data, error } = await supabase
        .from("Messages")
        .select("sender, receiver, message, created_at")
        .or(`sender.eq.${userId},receiver.eq.${userId}`)
        .or(`sender.eq.${chatUserId},receiver.eq.${chatUserId}`)
        .order("created_at", { ascending: true });

      if (error) throw error;

      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase.from("Messages").insert([
        { sender: userId, receiver: selectedChat, message: newMessage },
      ]);

      if (error) throw error;

      setMessages([...messages, { sender: userId, receiver: selectedChat, message: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }

  return (
    <div className="messages-container">
      <h2>Your Chats</h2>
      <div className="messages-wrapper">
        {/* Left panel: List of connected users */}
        <div className="users-list">
          {connectedUsers.map((user) => (
            <div key={user.user_id} className="user-item" onClick={() => fetchMessages(user.user_id)}>
              {user.username}
            </div>
          ))}
        </div>

        {/* Right panel: Chat messages */}
        <div className="chat-section">
          {selectedChat ? (
            <>
              <div className="chat-box">
                {messages.map((msg, index) => (
                  <div key={index} className={msg.sender === userId ? "sent" : "received"}>
                    {msg.message}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          ) : (
            <p>Select a user to start chatting.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
