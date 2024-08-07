import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import Token from '../models/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {

  static createAccount = async(req: Request, res: Response)=>{
    const {password, email} = req.body
    try {
      // user exist
      const userExist = await User.findOne({email})
      if(userExist){
        const error = new Error('Usuario con este email ya existe')
        return res.status(409).json({error: error.message})
      }
      // hash password
      const user = new User(req.body)
      user.password = await hashPassword(password)
      // generate token 
      const token = new Token()
      token.token = generateToken()
      token.user = user.id

      //send mail
      AuthEmail.sendConfirmationEmail({email: user.email, token: token.token, name: user.name})

      await Promise.allSettled([user.save(), token.save()])
      
      res.send('Cuenta creada con exito, revisa tu email y confirma la cuenta')
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      res.status(500).json({ error: 'Error al crear cuenta' });
    }
  }

  static confirmAccount = async(req: Request, res: Response)=>{
    const { token } = req.body
    try {
      const tokenExist = await Token.findOne({token})
      if(!tokenExist){
        const error = new Error('Token no válido')
        return res.status(409).json({error: error.message})
      }

      const user = await User.findById(tokenExist.user)
      user.confirmed = true
      
      await Promise.allSettled([user.save(), tokenExist.deleteOne()])

      res.send('Cuenta confirmada')
    } catch (error) {
      console.error('Error al confirmar cuenta:', error);
      res.status(500).json({ error: 'Error al confirmar cuenta' });
    }
  }
}