// App.js
import React, { useState, useEffect } from 'react';
import Login from './Components/login';
import Attendance from './Components/attendence';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [logoutTime, setLogoutTime] = useState(null); // Define logoutTime state
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser(userData);
      setLoggedIn(true);
    }
  }, []); // Run only once on component mount

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    const email = userData.email;
    const previousLoginTime = localStorage.getItem(`loginTime_${email}`);
    if (!previousLoginTime) {
      const currentLoginTime = new Date().toISOString();
      localStorage.setItem(`loginTime_${email}`, currentLoginTime);
      // console.log(`User ${email} logged in at:`, new Date(currentLoginTime).toLocaleString());
    }
  };
  
  const handleLogout = () => {
    const email = user?.email;
    if (email) {
      const loginTime = new Date(localStorage.getItem(`loginTime_${email}`));
      const logoutTime = new Date();
      const previousTotalTimeSpent = parseInt(localStorage.getItem(`totalTimeSpent_${email}`) || 0);
      const sessionTimeSpent = Math.round((logoutTime - loginTime) / 1000);
      const totalTimeSpent = previousTotalTimeSpent + sessionTimeSpent;
      console.log(`Total time spent for ${email}:`, totalTimeSpent, 'seconds');
      console.log('Logout Time:', logoutTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      localStorage.setItem(`totalTimeSpent_${email}`, totalTimeSpent);
      localStorage.removeItem(`loginTime_${email}`);
      setLogoutTime(logoutTime); // Set the logoutTime state
    }
    setUser(null);
    setLoggedIn(false);
  };
  
  
  const handleMarkAttendance = (region, shift) => {
    if (!user) {
      console.error('User is not defined.');
      return;
    }
    // Capture user's email and correct login time (IST)
    const email = user.email;
    const loginTimeIST = new Date(localStorage.getItem(`loginTime_${email}`)).toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata', // Set the correct time zone
    });
    console.log('Email:', email);
    console.log('Login Time (IST):', loginTimeIST);
    // Log region and shift
    console.log('Region:', region);
    console.log('Shift:', shift);

    // Logic to mark attendance
    // console.log('Attendance marked!');
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} 
        setLoggedIn={setLoggedIn} />
      ) : (
        <Attendance 
        user={user}
        onMarkAttendance={handleMarkAttendance} 
        onLogout={handleLogout}
        setLoggedIn={setLoggedIn} 
        logoutTime={localStorage.getItem(`logoutTime_${user?.email}`)} // Pass logoutTime
      />
      
      )}
    </div>
  );
}

export default App;
