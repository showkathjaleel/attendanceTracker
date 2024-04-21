// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import videoBackground from '../assets/1.mp4'; // Import the video file
// import UhhoImage from '../assets/uhho.png';
// import { updateAPI } from '../services/allAPI';

// const Container = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const VideoBackground = styled.video`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const GlassBox = styled.div`
//   background: rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(9px);
//   border-radius: 40px;
//   padding: 80px;
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
// `;

// const Content = styled.div`
//   width: 300px;
//   text-align: center;
// `;

// const shine = keyframes`
//   0% {
//     background-position: 0% center;
//   }
//   100% {
//     background-position: 200% center;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   height: 40px;
//   margin-bottom: 15px;
//   background-color: #2ecc71;
//   color: #fff;
//   font-size: 18px;
//   border: none;
//   border-radius: 4px;
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
//   position: relative;
//   overflow: hidden;

//   &:hover {
//     animation: ${shine} 1s linear infinite;
//   }

//   &:hover::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 100%);
//     animation: ${shine} 1s linear infinite;
//   }
// `;

// const Popup = styled.div`
//   position: fixed;
//   top: 25%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const PopupImage = styled.img`
//   width: 300px;
//   margin-bottom: 60px;
// `;

// const CloseButton = styled.button`
//   background-color: #2ecc71;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #27ae60;
//   }
// `;


// const Attendance = ({ user, onMarkAttendance, onLogout, logoutTime }) => {
//   const [attendanceMarked, setAttendanceMarked] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     let inactivityTimeout;

//     const resetInactivityTimeout = () => {
//       clearTimeout(inactivityTimeout);
//       inactivityTimeout = setTimeout(() => {
//         setAttendanceMarked(false);
//         setShowPopup(true);
//       }, 100000000000000);
//     };

//     const handleActivity = () => {
//       resetInactivityTimeout();
//     };

//     resetInactivityTimeout();

//     window.addEventListener('mousemove', handleActivity);
//     window.addEventListener('keypress', handleActivity);

//     return () => {
//       clearTimeout(inactivityTimeout);
//       window.removeEventListener('mousemove', handleActivity);
//       window.removeEventListener('keypress', handleActivity);
//     };
//   }, []);

//   const handleMarkAttendance = (region, shift) => {
//     if (!user) {
//       console.error('User is not defined.');
//       return;
//     }

//     console.log('Attendance marked!');
//     setAttendanceMarked(true);
//     if (onMarkAttendance) {
//       onMarkAttendance(region, shift); // Pass region and shift parameters
//     }
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//     if (onLogout) {
//       onLogout();
//     }
//   };


//   // const onLogout = async (e) => {
//   //   e.preventDefault();
    
//   //   // Capture login time
//   //   const logoutTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });    
//   //   const userData = { logoutTime }; // Include loginTime in userData
//   //   onLogout(userData);
//   //   console.log(userData);
  
//   //   if (!logoutTime) {
//   //     alert("");
//   //   } else {
//   //     try {
//   //       const result = await updateAPI(userData);
//   //       console.log(result);
//   //       // if(result.status===200){
//   //       //   Handle success
//   //       // } else {
//   //       //   Handle failure
//   //       // }
//   //     } catch (err) {
//   //       console.log(err);
//   //       // Handle error
//   //     }
//   //   }
//   // };








//   return (
//     <Container>
//       <VideoBackground autoPlay loop muted>
//         <source src={videoBackground} type="video/mp4" />
//       </VideoBackground>
//       <GlassBox>
//         <Content>
//           <Button onClick={() => handleMarkAttendance(user.region, user.shift)} disabled={attendanceMarked}>
//             {attendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
//           </Button>
//           <Button onClick={onLogout}>Logout</Button>
//           {showPopup && (
//             <Popup>
//               <PopupImage src={UhhoImage} alt="Uhho Image" />
//               <p>Your attendance has been deleted due to your inactivity</p>
//               <p>Logout Time: {new Date(logoutTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
//               <CloseButton onClick={handlePopupClose}>Close</CloseButton>
//             </Popup>
//           )}
//         </Content>
//       </GlassBox>
//     </Container>
//   );
// };

// export default Attendance;


import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
// import videoBackground from '../assets/1.mp4'; // Import the video file
// import UhhoImage from '../assets/uhho.png';
import { logoutAPI } from '../services/allAPI';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const VideoBackground = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GlassBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(9px);
  border-radius: 40px;
  padding: 80px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Content = styled.div`
  width: 300px;
  text-align: center;
`;

const shine = keyframes`
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  overflow: hidden;

  &:hover {
    animation: ${shine} 1s linear infinite;
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 100%);
    animation: ${shine} 1s linear infinite;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PopupImage = styled.img`
  width: 300px;
  margin-bottom: 60px;
`;

const CloseButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const Attendance = ({ user, onMarkAttendance, logoutTime , setLoggedIn }) => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   let inactivityTimeout;

  //   const resetInactivityTimeout = () => {
  //     clearTimeout(inactivityTimeout);
  //     inactivityTimeout = setTimeout(() => {
  //       setAttendanceMarked(false);
  //       setShowPopup(true);
  //     }, 100000000000000);
  //   };

  //   const handleActivity = () => {
  //     resetInactivityTimeout();
  //   };

  //   resetInactivityTimeout();

  //   window.addEventListener('mousemove', handleActivity);
  //   window.addEventListener('keypress', handleActivity);

  //   return () => {
  //     clearTimeout(inactivityTimeout);
  //     window.removeEventListener('mousemove', handleActivity);
  //     window.removeEventListener('keypress', handleActivity);
  //   };
  // }, []);

  const onLogout = async () => {
    try {
      // Capture logout time
      const logoutTime = new Date().toISOString();
      
      // Call the update API to update the logout time
      const response = await logoutAPI({
       attendanceId: localStorage.getItem("attendanceId")
      });
      console.log(response,'responseeee')

      // if (response.ok) {
        // If update is successful, set attendance marked state to true
        localStorage.setItem("attendanceId",null)
        setLoggedIn(false)
        alert(response.data.message)
        setAttendanceMarked(true);
      // } else {
      //   // If update fails, handle error
      //   console.error('Failed to update logout time');
      // }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleMarkAttendance = () => {
    if (!user) {
      console.error('User is not defined.');
      return;
    }

    console.log('Attendance marked!');
    setAttendanceMarked(true);
    if (onMarkAttendance) {
      onMarkAttendance(user.region, user.shift); // Pass region and shift parameters
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <Container>
      <VideoBackground autoPlay loop muted>
        <source 
        // src={videoBackground}
         type="video/mp4" />
      </VideoBackground>
      <GlassBox>
        <Content>
          <Button onClick={handleMarkAttendance} disabled={attendanceMarked}>
            {attendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
          </Button>
          <Button onClick={onLogout}>Logout</Button>
          {showPopup && (
            <Popup>
              <PopupImage src={UhhoImage} alt="Uhho Image" />
              <p>Your attendance has been deleted due to your inactivity</p>
              <p>Logout Time: {new Date(logoutTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
              <CloseButton onClick={handlePopupClose}>Close</CloseButton>
            </Popup>
          )}
        </Content>
      </GlassBox>
    </Container>
  );
};

export default Attendance;
