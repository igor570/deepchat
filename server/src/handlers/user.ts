import { comparePasswords, hashPassword } from './../utils/hashPasswords'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import db from '../db'

interface User {
  id: string
  username: string
  password: string
}

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  console.log(username, password)

  if (!username || !password) {
    res.status(400).json({ message: 'No username or password received' })
    return
  }

  try {
    console.log('Pre hashing...')
    const hashedPassword = await hashPassword(password)
    console.log(hashPassword)
    const query = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2)`,
      [username, hashedPassword]
    )

    console.log(query)

    res.status(200).json({ message: 'Created user' })

    //error
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ message: 'No username or password received' })
    return
  }

  try {
    const foundUser = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    )
    const user: User = foundUser.rows[0]

    if (!user) {
      res.status(400).json({ message: 'Unable to find user by username' })
      return
    }

    const verifyPasswords = await comparePasswords(password, user.password)

    if (!verifyPasswords) {
      res.status(400).json({ message: 'Passwords did not match user' })
      return
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)

    res.status(200).json({ message: 'Logged in', token })

    //error
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error })
  }
}
