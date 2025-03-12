import BucketList from "./pages/BucketList";  
import Matches from "./pages/Matches";  
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/homePage";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <Router>
    <Recommendations />
    </Router>
  //    <div>
  //   <BucketList />

  //   {/* <Matches /> */}

  //   {/* <Profile /> */}

  //   {/* <HomePage /> */}
    
  //   {/* <Landing /> */}

  //   {/* <LogIn /> */}

  //    {/* <SignUp /> */}
  //   {/* //  <Header /> */}

  //   {/* <Recommendations />  */}


  //  </div>

    
  );

  // return (
  //   <Router>
  //     <Header />
  //     <Routes>
        
  //       <Route path="/mybucket" element={<BucketList />} />
  //       <Route path="/matches" element={<Matches />} />
  //       {/* <Route path="/messages" element={<Messages />} /> */}
  //       <Route path="/profile" element={<Profile />} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;