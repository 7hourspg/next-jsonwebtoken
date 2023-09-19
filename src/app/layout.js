import HandleNav from "./components/HandleNav/HandleNav";
import Navbar from "./components/navbar/Navbar";
import "./globals.scss";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
   title: "Json web token authentication with next js",
   description: "Json web token authentication with next js",
};

export default function RootLayout({children}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <HandleNav />
            {children}
         </body>
      </html>
   );
}
