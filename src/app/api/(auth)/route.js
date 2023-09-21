import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'

const dummyData = [
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
  }
]

export const GET = async () => {
  try {
    return new NextResponse(JSON.stringify(dummyData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'OK'
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'Internal Server Error'
    })
  }
}

export const POST = async (req, res) => {
  const { email, password } = await req.json()
  console.log(email, password)

  try {
    /* Any how email or password is blank */
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: 'Please fill all the field' }),
        {
          status: 400,
          statusText: 'Bad Request'
        }
      )
    }
    const user = dummyData.find(
      user => user.email === email && user.password === password
    )
    if (user) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
      const acsessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
      })
      console.log(acsessToken)

      return new NextResponse(
        JSON.stringify({ message: 'Login Success', user }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } else {
      return new NextResponse(JSON.stringify({ message: 'Login Failed' }), {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const DELETE = async (req, res) => {
  const headersInstance = headers()
  const authorization = headersInstance.get('authorization')

  try {
    const verifyToken = jwt.verify(authorization, process.env.JWT_SECRET)
    console.log('token:', verifyToken)

    if (!verifyToken.isAdmin) {
      if (verifyToken.id === req.params.id) {
        return new NextResponse(JSON.stringify({ message: 'Delete Success' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'OK'
        })
      }
      return new NextResponse(
        JSON.stringify({
          message: 'You are not authorized to delete this user'
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
          statusText: 'Unauthorized'
        }
      )
    }

    return new NextResponse(JSON.stringify({ message: 'You are admin go ahead' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'OK'
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
