/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import FirebaseAuthService from "FirebaseAuthService";
import { useNavigate } from "react-router";

function SignIn({existingUser}) {
  const [rememberMe, setRememberMe] = useState(true); 
  const [username, setUserName]= useState("");
  const [password, setPassword]= useState("");
  const navigate=useNavigate();


  async function handleSubmit(event){
    event.preventDefault();
    try{
     let temp= await FirebaseAuthService.loginUser(username, password);
     const token = await Object.entries(temp.user)[5][1].b;
     localStorage.setItem('token', token)
       navigate('/dashboard');
    }
    catch (error){
      alert(error.message)
    }
  }
  async function handleResetPassword(event){
    if(!username) {
      alert('Missing Email!')
    }
    try{
      console.log(username,password);
     await FirebaseAuthService.sendPasswordRestEmail(username);
     alert("Password Reset link is successfully send to your email.")
       setUserName("");
    }
    catch (error){
      alert(error.message)
    }
  }
  function handleLogout(){
    FirebaseAuthService.logoutUser();
  }

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
        <div>
          {localStorage.getItem('token') !==null ? <Navigate to="/dashboard"/> : 
          <div>
               <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Email" value={username} required onChange={(e) => setUserName(e.target.value)} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </SuiBox>
        <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth onClick={(e)=>handleSubmit(e)}>
            sign in
          </SuiButton>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" color="info" fullWidth onClick={(e)=>handleResetPassword(e)}>
            Reset Password
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
            Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>  
          </div>}
        
    </div>
  );
}

export default SignIn;
