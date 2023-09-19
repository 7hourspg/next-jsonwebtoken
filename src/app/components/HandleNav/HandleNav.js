"use client";
import Navbar from "../navbar/Navbar";
import {usePathname} from "next/navigation";
const HandleNav = () => {
   const path = usePathname();
   return path === "/login" || path === "/register" ? null : <Navbar />;
};

export default HandleNav;
