import bcrypt from 'bcrypt'

export const comparePasswords = (
    plainPassword: string,
    hashedPassword: string,
) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}

//TODO: Find out why process.env.SALT is breaking this function
export const hashPassword = (plainPassword: string) => {
    console.log(process.env.SALT)
    return bcrypt.hash(plainPassword, 5)
}
