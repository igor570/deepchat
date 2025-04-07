import bcrypt from 'bcrypt'

export const comparePasswords = (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export const hashPassword = (plainPassword: string) => {
  return bcrypt.hash(plainPassword, 5)
}
