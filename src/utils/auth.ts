import bcrypt from 'bcrypt'

export const hashPassword = async (password : string)=>{
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const verifiedPassword = async(password: string, passwordHash)=>{
  return await bcrypt.compare(password, passwordHash)
}