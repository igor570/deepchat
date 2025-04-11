import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Message } from '../types/message'

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export const hashPassword = (plainPassword: string) => {
  return bcrypt.hash(plainPassword, process.env.SALT ?? 5)
}
