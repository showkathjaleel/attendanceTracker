import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
// import hiAvatar from '../assets/hi.png';
// import videoBackground from '../assets/1.mp4';
import { registerAPI, loginAPI } from '../services/allAPI';
import {Link} from "react-router-dom"

// Styled components for the login page elements
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const WelcomeContainer = styled.div`
  position: absolute;
  left: 160px;
  top: 220px;
  z-index: 1;
`;

const WelcomeText = styled.h1`
  font-family: 'San Francisco', sans-serif;
  font-size: 85px;
  font-weight: lighter;
  margin-bottom: 0;
  background: linear-gradient(135deg, #007bff, #00bcd4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const ThinSpan = styled.span`
  font-weight: 300;
`;

const ObservationText = styled.p`
  font-family: 'San Francisco', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  margin-top: 10px;
`;

const GlassBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(9px);
  border-radius: 40px;
  padding: 40px 60px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  margin-left: 800px;
`;

const Content = styled.div`
  width: 300px;
  text-align: center;
  color: white;
`;

const AvatarContainer = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const sayHiAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  animation: ${sayHiAnimation} 2s infinite;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 14px;
  font-size: 12px;
  opacity: 0.8;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 12px;
  opacity: 0.8;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Option = styled.option`
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #007bff, #00bcd4);
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }
`;

const Login = ({ onLogin , setLoggedIn}) => {
  const [isSignup,setIsSignup]= useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [region, setRegion] = useState('');
  const [shift, setShift] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      
    // const userData = { email,password, region, shift }; // Include loginTime in userData
    // onLogin(userData,'userData');
    // console.log(userData);
  
    if (isSignup) {
     if (!email || !password ||  !region || !shift){
      alert("Please fill the form completely");
     }
     else {

      const signUpData={  email,  password,  region, shift}
      try {
        const result = await registerAPI(signUpData);
        setIsSignup(false)
      } catch (err) {
        console.log(err);

      }
      
     }

    } else  {

      if (!email || !password ){
        alert("Please fill the form completely");
      }

      else {

        const loginData={  email,  password}
        try {
          const response = await loginAPI(loginData);
          console.log(response,'responseeeeeeeeeeeeee')
          localStorage.setItem("attendanceId",response.data.attendanceId)
          setLoggedIn(true)
        } catch (err) {
          console.log(err);
  
        }
        
       }

    }
  };

  return (
    <Container>
      <WelcomeContainer>
        <WelcomeText>
          <ThinSpan>Welcome to</ThinSpan> <br />
          <BoldSpan>AttendanceMate</BoldSpan>
        </WelcomeText>
        <ObservationText>Your every move and non-move is under observation.</ObservationText>
      </WelcomeContainer>
      <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
        <source 
        // src={videoBackground}
         type="video/mp4" />
      </video>
      <GlassBox>
        <Content>
          <AvatarContainer>
            <Avatar 
            // src={hiAvatar}
             alt="Hi Avatar" />
          </AvatarContainer>
          <h2 style={{color:'black'}}>{isSignup ? "Signup" : "Login"}</h2>
          <Title>Please enter your</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
                        <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          {isSignup && 
          <>
                     <Select
                     value={region}
                     onChange={(e) => setRegion(e.target.value)}
                     required
                   >
                     <Option value="">Select Region</Option>
                     <Option value="South West">South West</Option>
                     <Option value="Mid West">Mid West</Option>
                     <Option value="North East">North East</Option>
                     <Option value="Florida">Florida</Option>
                     <Option value="Southern Pacific">Southern Pacific</Option>
                   </Select>
                   <Select
                     value={shift}
                     onChange={(e) => setShift(e.target.value)}
                     required
                   >
                     <Option value="">Select Shift</Option>
                     <Option value="Midnight (12:30 AM - 04:30 AM)">Midnight (12:30 AM - 04:30 AM)</Option>
                     <Option value="Early Morning (04:30 AM - 08:30 AM)">Early Morning (04:30 AM - 08:30 AM)</Option>
                     <Option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</Option>
                   </Select>
                   </>
                   } 
            {isSignup ?  <p style={{color:'black'}}>Already have an account ? <Link onClick={()=> setIsSignup(false)}>go to login </Link></p>
            : 
          <p style={{color:'black'}}>New to Attendance Tracker ? <Link onClick={()=> setIsSignup(true)}>signup here</Link></p>}
           
            <Button type="submit">{isSignup ? "Sign up" : "Login"}</Button>
          </Form>
        </Content>
      </GlassBox>
    </Container>
  );
};

export default Login;
