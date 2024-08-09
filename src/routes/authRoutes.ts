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
  body('repeat_password')
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

routerAuth.post("/login",
  body('email')
    .isEmail().withMessage("Email no válido"),
  body('password')
    .notEmpty().withMessage("La contraseña es obligatoria"),
  handleInputErrors,
  AuthController.loginAccount
)

routerAuth.post("/new_token",
  body('email')
    .isEmail().withMessage("Email no válido"),
  handleInputErrors,
  AuthController.newToken
)