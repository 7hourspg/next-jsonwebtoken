import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import jwt from 'jsonwebtoken'

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'john123',
    isAdmin: true
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    password: 'jane123',
    isAdmin: false
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    password: 'smith123',
    isAdmin: true
  }
]

export const GET = async (res, req) => {
  const id = req.params.id

  return new NextResponse(JSON.stringify({ message: 'Hello from id routes' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    statusText: 'OK'
  })
}

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization
//   if (authHeader) {
//     const token = authHeader.split(' ')[1]
//     console.log(token)

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json('Token is not valid!')
//       }

//       req.user = user
//       next()
//     })
//   } else {
//     res.status(401).json('You are not authenticated!')
//   }
// }

// export const DELETE = async (req, { params }) => {
//   const headersInstance = headers()
//   const authorization = headersInstance.get('authorization')
//   // const verifyToken = jwt.verify(authorization, process.env.JWT_SECRET)
//   // console.log('token:', verifyToken)
//   // console.log(req)

//   return jwt.verify(authorization, process.env.JWT_SECRET, err => {
//     if (err) {
//       return new NextResponse(
//         JSON.stringify({ message: 'Token is not valid' }),
//         {
//           status: 401,
//           statusText: 'Unauthorized',
//           headers: { 'Content-Type': 'application/json' }
//         }
//       )
//     } else {
//       const id = params.id
//       const isUserAdmin = users.filter(user => user.id === Number(id))[0]

//       console.log(isUserAdmin)
//       if (isUserAdmin.isAdmin) {
//         return new NextResponse(JSON.stringify({ message: 'Delete Success' }), {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' },
//           statusText: 'OK'
//         })
//       } else {
//         return new NextResponse(
//           JSON.stringify({
//             message: 'You are not authorized to delete this user'
//           }),
//           {
//             status: 401,
//             headers: { 'Content-Type': 'application/json' },
//             statusText: 'Unauthorized'
//           }
//         )
//       }

//       // return new NextResponse(JSON.stringify({ message: 'Delete Success' }), {
//       //   status: 200,
//       //   headers: { 'Content-Type': 'application/json' },
//       //   statusText: 'OK'
//       // })
//     }
//   })
// }

export const DELETE = async (req, { params }) => {
  const headersInstance = headers()
  const authorization = headersInstance.get('authorization')
  console.log(params.id)

  try {
    const verifyToken = jwt.verify(authorization, process.env.JWT_SECRET)
    console.log('token:', verifyToken)

    if (verifyToken.isAdmin && verifyToken.id == params.id) {
      return new NextResponse(
        JSON.stringify({ message: 'You are admin go ahead' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'OK'
        }
      )
    } else if (verifyToken.id == params.id) {
      return new NextResponse(
        JSON.stringify({
          message: 'You can delete your account'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'OK'
        }
      )
    }
    return new NextResponse(JSON.stringify({ message: 'Token is not valid' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'Unauthorized'
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
