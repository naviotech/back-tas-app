import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

export const routerAuth = Router()

routerAuth.post('/create-account', 
  body('name')
    .notEmpty().withMessage("El nombre es obligatorio"),
  body('password')
    .isLength({min: 8}).withMessage("Contraseña mínima de ocho carácteres"),
  body('repeat-password')
    .custom((value, {req})=>{
      if(value !== req.body.password){
        throw new Error('Las contraseñas no coinciden')
      }
      return true
    }),
  body('email')
    .isEmail().withMessage("Email no válido"),
  handleInputErrors,
  AuthController.createAccount
)

routerAuth.post("/confirm-account",
  body("token")
    .notEmpty().withMessage("El token es obligatorio"),
  handleInputErrors,
  AuthController.confirmAccount
)