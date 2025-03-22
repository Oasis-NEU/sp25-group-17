import BucketList from "./pages/BucketList";  
import Matches from "./pages/Matches";  
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/homePage";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Messages from "./pages/Messages";
import UserProfile from "./pages/UserProfile";
import Recommendations from "./pages/Recommendations";


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe(); // Cleanup subscription on unmount
    };
  }, []);

  return(
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
           <Route
          path="/profile/:userId" 
          element={session ? <><Header /><UserProfile /></> : <Navigate to='/UserProfile' />} 
          />
           <Route
          path="/Recommendations"
          element={session ? <><Header /><Recommendations /></> : <Navigate to='/login' />}
          />
          <Route
          path="/messages"
          element={session ? <><Header /><Messages /></> : <Navigate to='/login' />}
          />
         
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

    </Router>
  );}

//   return (
//     <AuthProvider>
//     <Router>
//       <div className="App">
//         {/* If no session, show the authentication UI */}
//         {!session ? (
//           <Routes>
//           <Route path="/*" element={<Navigate to="/SignUp" />} />
//           <Route path="/SignUp" element={<SignUp setSession={setSession} />} />
//         </Routes>
//         ) : (
//           <>
//             <Header />
//             <Routes>
//               <Route path="/" element={<Landing />} />
//               <Route path="/SignUp" element={<SignUp />} />
//               <Route path="/Login" element={<LogIn setSession={setSession} />} />
//               <Route path="/mybucket" element={<BucketList />} />
//               <Route path="/matches" element={<Matches />} />
//                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//               <Route path="/messages" element={<messages />} />
//               <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
//             </Routes>
//           </>
//         )}
//       </div>
//     </Router>
//     </AuthProvider>
//   );
// }

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