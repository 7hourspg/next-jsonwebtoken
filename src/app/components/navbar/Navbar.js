"use client";
import styles from "./navbar.module.scss";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Navbar = () => {
   const path = usePathname();
   console.log(path);

   return (
      <div className={styles.container}>
         <div className={styles.navbar_wrapper}>
            <div className={styles.navbar_left}>
               <div className={styles.navbar_logo}>
                  <h1>Logo</h1>
               </div>
            </div>
            <div className={styles.navbar_right}>
               <ul className={styles.navbar_menu}>
                  <Link className={path == "/" ? styles.active : ""} href="/">
                     <li className={styles.navbar_menu_item}>Home</li>
                  </Link>
                  <Link
                     className={path == "/about" ? styles.active : ""}
                     href="/about"
                  >
                     <li className={styles.navbar_menu_item}>About</li>
                  </Link>
                  <Link className={path == "/contact" ? styles.active : ""} href="/contact">
                  <li className={styles.navbar_menu_item}>Contact</li>
                  </Link>
                  <Link className={path == "/login" ? styles.active : ""} href="/login">
                  <li className={styles.navbar_menu_item}>Log In</li>
                  </Link>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
