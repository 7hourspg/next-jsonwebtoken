import styles from "./register.module.scss";
import Link from "next/link";

const RegisterPage = () => {
   return (
      <div className={styles.register_container}>
         <h1 className={styles.register_header_text}>Register</h1>
         <form className={styles.register_form}>
            <h5>E-mail</h5>
            <input className={styles.register_form_input} type="text" />
            <h5>Password</h5>
            <input className={styles.register_form_input} type="password" />
            <button type="submit" className={styles.register_form_button}>
               Sign In
            </button>
            <p className={styles.text}> Already have an account?</p>
            <Link href="/login">
            <button className={styles.login_button}>
               Login to your account
            </button>
               </Link>
         </form>
      </div>
   );
};

export default RegisterPage;
