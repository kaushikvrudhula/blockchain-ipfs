import React from "react";
import MojoAuth from "mojoauth-web-sdk";
import { verifyPasswordResetCode } from "firebase/auth";
import { useAuth } from '../Context/AuthContext';
import { Navigate, useNavigate } from "react-router";

function Verify() {
  const navigate = useNavigate();
  const { getRole ,getPhone,currentUser } = useAuth();
  const [payload, setPayload] = React.useState(null)
  const userRole = { Teacher: '/teacher', COE: '/coe', Super: '/super' };
  //  1 Initialize and show the form
  React.useEffect(() => {
    const mojoauth = new MojoAuth("test-b4cb65cc-ebf9-424a-97d8-c7b52883d07f", {
      language: "language_code",
      redirect_url: "",
      source: [
        { type: "phone", feature: "otp" },
      ],
    })
    // const verify= document.getElementById("mojoauth-passwordless-phone").value;
    mojoauth.signIn().then(async payload => {
	    setPayload(payload)
        const phone=await getPhone(currentUser.email);
        
        // console.log(verify);
      
        if(payload.authenticated===true){
             const role = await getRole(currentUser.email);
             navigate(userRole[role]);
           
        }
	    	})
}, [ ])
return (
	<div>
	    {/* 2 Put a div that will contain the form*/}
	    <div id="mojoauth-passwordless-form">
        </div>
	    
	</div>
	)
}


export default Verify;