"use client";
import Link from "next/link";
import styles from "./login.module.scss";
import {useState} from "react";
import axios from "axios";

const LoginPage = () => {
   const [userData, setUserData] = useState({email: "", password: ""});

   const handleChange = (e) => {
      const {name, value} = e.target;
      setUserData((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   // console.log(userData);

   const handleSubmit = (e) => {
      e.preventDefault();
      try {
         axios.post("/api", userData).then((res) => {
            console.log(res);
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className={styles.login_container}>
         <h1 className={styles.login_header_text}>Login</h1>
         <form className={styles.login_form}>
            <h5>E-mail</h5>
            <input
               onChange={handleChange}
               className={styles.login_form_input}
               type="text"
               name="email"
            />
            <h5>Password</h5>
            <input
               onChange={handleChange}
               className={styles.login_form_input}
               type="password"
               name="password"
            />
            <button
               onClick={handleSubmit}
               type="submit"
               className={styles.login_form_button}
            >
               Sign In
            </button>
            <p className={styles.text}> Don't have an account? </p>
            <Link href="/register">
               <button className={styles.register_button}>
                  Create your account
               </button>
            </Link>
         </form>
      </div>
   );
};

export default LoginPage;
