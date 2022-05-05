import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => {
        console.log("dad");
      loginWithRedirect();
    }} 
  style={{ color: 'white', textDecorationLine: 'underline', backgroundColor: 'transparent', position: 'absolute', right: '5vh'}} >Log In</button>;
};

export default LoginButton;