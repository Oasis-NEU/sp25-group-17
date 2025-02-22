import "./Profile.css";
import ProfileImg from "../assets/Profile Icon.png";

function Profile() {
    return (
        <div className="container1">
            <h1 className="message2">Your Profile</h1>

            
                <div className="form">
                    <input type="text" placeholder="Full Name" className="input1" />
                    <input type="text" placeholder="Username" className="input1" />
                    <input type="date" placeholder="Birthday" className="input1" />
                    <input type="email" placeholder="Email" className="input1" />
                    <input type="number" placeholder="Phone Number" className="input1" />
                    <input type="text" placeholder="School/University" className="input1" />
                    <input type="text" placeholder="Location" className="input1" />
                    <button className="button1">Save Profile</button>
                </div>

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