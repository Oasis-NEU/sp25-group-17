import "./Profile.css";

function Profile() {
    return (
        <div className="container">
            <h1 className="message">Your Profile</h1>

            <div className="profile-layout">
                <div className="form">
                    <input type="text" placeholder="Full Name" className="input" />
                    <input type="text" placeholder="Username" className="input" />
                    <input type="date" placeholder="Birthday" className="input" />
                    <input type="email" placeholder="Email" className="input" />
                    <input type="number" placeholder="Phone Number" className="input" />
                    <input type="text" placeholder="School/University" className="input" />
                    <input type="text" placeholder="Location" className="input" />
                    <button className="button">Save Profile</button>
                </div>

                <div className="image-container">
                    <div className="profile-placeholder">Profile</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;