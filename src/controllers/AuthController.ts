import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'

export class AuthController {

  static createAccount = async(req: Request, res: Response)=>{
    const {password, email} = req.body
    try {
      const userExist = await User.findOne({email})
      if(userExist){
        const error = new Error('Usuario con este email ya existe')
        return res.status(409).json({error: error.message})
      }
      const user = new User(req.body)
      user.password = await hashPassword(password)
      
      await user.save()
      res.send('Cuenta creada con exito, revisa tu email y confirma la cuenta')
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      res.status(500).json({ error: 'Error al crear cuenta' });
    }
  }
}