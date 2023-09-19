import {NextResponse} from "next/server";

const dummyData = [
   {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "john123",
   },
   {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      password: "jane123",
   },
];

export const GET = async () => {
   try {
      return new NextResponse(JSON.stringify(dummyData), {
         status: 200,
         headers: {"Content-Type": "application/json"},
         statusText: "OK",
      });
   } catch (error) {
      return new NextResponse(JSON.stringify(error), {
         status: 500,
         headers: {"Content-Type": "application/json"},
         statusText: "Internal Server Error",
      });
   }
};

export const POST = async (req, res) => {
   const {email, password} = await req.json();

   try {
      if (
         dummyData.find(
            (user) => user.email === email && user.password === password
         )
      ) {
         return new NextResponse(JSON.stringify({message: "Login Success"}), {
            status: 200,
            statusText: "OK",
            headers: {"Content-Type": "application/json"},
         });
      } else {
         return new NextResponse(JSON.stringify({message: "Login Failed"}), {
            status: 401,
            statusText: "Unauthorized",
            headers: {"Content-Type": "application/json"},
         });
      }
   } catch (error) {
      return new NextResponse(JSON.stringify(error), {
         status: 500,
         statusText: "Internal Server Error",
         headers: {"Content-Type": "application/json"},
      });
   }
};
