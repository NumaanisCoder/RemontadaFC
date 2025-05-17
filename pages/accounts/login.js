import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/account.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  let previousPath = Cookies.get("BlogPreviousPath");
  const router = useRouter();
  
  const firebaseConfig = {
    apiKey: "AIzaSyCYMZgFyW4i9VPapCOFxpjn-0Apjchf3Wg",
    authDomain: "gamegrasper-3e636.firebaseapp.com",
    projectId: "gamegrasper-3e636",
    storageBucket: "gamegrasper-3e636.appspot.com",
    messagingSenderId: "828323947217",
    appId: "1:828323947217:web:edddc89704b65bb87c1bf0",
    measurementId: "G-3FW4DZY8TX"
  };
  
  const app = initializeApp(firebaseConfig);

  const SignInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/GoogleAuth/Sign`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error('Failed to authenticate with Google');
          }
          
          if (previousPath) {
            router.push(previousPath);
          } else {
            router.push('/');
          }
        } catch (error) {
          console.error('API error:', error);
        }
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
      });
  };

  const cookieConsentStatus = Cookies.get('cookieConsent');
  const [FormValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  
  const [submitButton, setsubmitButton] = useState("Login");

  function inputHandler(e) {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
    setError({ emailError: "", passwordError: "" });
  }

  async function formHandler(e) {
    if(cookieConsentStatus !== "accepted"){
      setsubmitButton("You must Accept Cookies!");
      return;
    }
    e.preventDefault();
    setsubmitButton("Logging in...");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormValues),
    });
    const data = await response.json();
    if (data.status == 404) {
      setsubmitButton("Login");
      enqueueSnackbar("Email Not Found",{variant:"error"});
      setError({ emailError: "Email is not registered" });
    } else if (data.status == 402) {
      setsubmitButton("Login");
      enqueueSnackbar("Incorrect Password",{variant:"error"});
      setError({ passwordError: "Password Not matched" });
    } else if (data.status == 200) {
      Cookies.set("token", data.token, {expires: 7})
      setsubmitButton("Login Successful!");
      enqueueSnackbar("Welcome to FootballPulse!", {variant:"success"});
      router.push('/');
    }
  }

  return (
    <div className={`${style.root} ${isDarkMode ? style.darkRoot : ""}`}>
      <form
        autoComplete="off"
        autoSave="off"
        className={style.form}
        onSubmit={formHandler}
      >
        <div className={style.formGroup}>
          <h1 className={style.loginTitle}>Login to FootballPulse</h1>
        </div>

        <div className={`${style.formGroup} ${style.emailFormGroup}`}>
          <input
            type="email"
            name="email"
            id="email"
            className={style.emailInput}
            value={FormValues.email}
            autoComplete="off"
            onChange={inputHandler}
            placeholder=" "
            required
          />
          <label htmlFor="email" className={style.emailLabel}>Email</label>
          <p className={style.errorMessage}>{error.emailError}</p>
        </div>
        
        <div className={style.formGroup}>
          <input
            type="password"
            name="password"
            id="password"
            className={style.passwordInput}
            value={FormValues.password}
            autoComplete="off"
            onChange={inputHandler}
            placeholder=" "
            required
          />
          <label htmlFor="password" className={style.passwordLabel}>Password</label>
          <p className={style.errorMessage}>{error.passwordError}</p>
        </div>
        
        <div className={style.formGroup}>
          <button className={style.button}>{submitButton}</button>
        </div>
        
        <div className={style.formGroup}>
          <Link href="/accounts/forgetpassword" className={style.forgotPassword}>Forgot password?</Link>
        </div>
      </form>

      <div className={style.alternateOptions}>
        <div className={style.divider}>
          <span>OR</span>
        </div>
        
        <button onClick={SignInWithGoogle} className={style.googleButton}>
          <img src="/google.png" alt="Google logo" />
          Continue with Google
        </button>
        
        <Link href={'/accounts/signup'} className={style.signupLink}>
          Don't have an account? <span>Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;