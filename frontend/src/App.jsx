import BucketList from "./pages/BucketList";  
import Matches from "./pages/Matches";  
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/homePage";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data}) => setSession(data.session));
    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return() => authListener.subscription.unsubscribe();
  }, []);

  return (
    <Router basename="/">
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route 
            path="/mybucket" 
            element={session ? <><Header /><BucketList /></> : <Navigate to='/login' />} 
          />
          <Route 
            path="/matches" 
            element={session ? <><Header /><Matches /></>: <Navigate to='/login' />} 
          />
          <Route 
            path="/profile" 
            element={session ? <><Header /><Profile /></> : <Navigate to='/login' />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

    </Router>
  );
}


// function App() {
//   return (
//     <Router>
//      <div className="App">
       
//        <Routes>
//        <Route path="/" element={<Landing />} />
//          <Route path="/SignUp" element={<SignUp />} />
//          <Route path="/login" element={<LogIn />} />
//          <Route 
//            path="/mybucket" 
//            element={
//              <>
//                <Header />
//                <BucketList />
//              </>
//            } 
//          />
         
//          <Route 
//            path="/matches" 
//            element={
//              <>
//                <Header />
//                <Matches />
//              </>
//            } 
//          />
         
//          {/* <Route 
//            path="/messages" 
//            element={
//              <>
//                <Header />
//                <Messages />
//              </>
//            } 
//          /> */}
         
//          <Route 
//            path="/profile" 
//            element={
//              <>
//                <Header />
//                <Profile />
//              </>
//            } 
//          />
         
//          {/* Redirect unknown routes to home */}
//          <Route path="*" element={<Navigate to="/" />} />
//        </Routes>
//      </div>
//    </Router>
//   );
 
 
 
 
 
 
  //return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LogIn />} />
    //    <Route path="/matches" element={<Matches />} /> 
    //   </Routes>
    // </Router>

    // <Router>
    // <LogIn/>
    // </Router>
  //    <div>
  //   <BucketList />

  

    
  //);
// }

export default App;