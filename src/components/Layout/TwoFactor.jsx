import firebase from './Context/firebase';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

const handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
        [name]: value
    })
}
const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            this.onSignInSubmit();
            console.log("Recaptcha verified")
        },
        defaultCountry: "IN"
    }, auth);
}

const onSignInSubmit = (e) => {
    e.preventDefault()

    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)

    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been sent")
                // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("sms nahi aaya")
        });

}
 const  Two_Factor =()=>{
  

    const onSubmitOTP = (e) => {
        e.preventDefault()
        const code = this.state.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user))
            alert("USER IS VERIFIED")
                // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("Galat OTP hai yaaar")
        });
    }
    return(
        <div>
        <h2>User Phone Number</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
        <input type="number" name="mobile" placeholder="Mobile Number" required onChange={this.handleChange} />
        <button type="submit"> Submit</button>
         </form>
         <h2>Enter OTP</h2>
         <form onSubmit={this.onSubmitOTP}>
        <input type="number" name="otp" placeholder="Enter OTP" required  onChange={this.handleChange}  />
        <button type="submit"> Submit</button>
         </form>
     </div>
    );
};


export default TwoFactor;