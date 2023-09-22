import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { setCookie } from 'cookies-next'

const users = [
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

export const GET = async () => {
  return new NextResponse(
    JSON.stringify({ message: 'Hola, From login route' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      statusText: 'OK'
    }
  )
}

export const POST = async (req, res) => {
  const { email, password } = await req.json()
  // console.log(email, password)

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
    const user = users.find(
      user => user.email === email && user.password === password
    )
    if (user) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }

      if (cookies().has('token')) {
        console.log('cookie already set')
      } else {
        const acsessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h'
        })
        console.log(acsessToken)
        cookies().set('token', acsessToken, {
          httpOnly: false,
          secure: false,
          expires: new Date(Date.now() + 60 * 1000) // 1 min
        })
      }

      return new NextResponse(
        JSON.stringify({ message: 'Login Success', user }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } else {
      return new NextResponse(
        JSON.stringify({ message: 'Invalid Creaditals' }),
        {
          status: 401,
          statusText: 'Unauthorized',
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
