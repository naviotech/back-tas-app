import { transporter } from "../config/nodemailer"

type ConfirmationEmailProps = {
  email: string,
  token: string,
  name: string
}
export class AuthEmail {
  static sendConfirmationEmail = async({email,token, name}: ConfirmationEmailProps) =>{
    await transporter.sendMail({
      from: 'task <admin@task.com',
      to: email,
      subject: 'Task - Confirma tu cuenta',
      text: `Confirma tu cuenta ${name}`,
      html:`<p>Hola ${name},</p>
            <p>Codigo para confirmar cuenta: <strong>${token}</strong></>
            <p>"Este codigo es de un solo uso y vàlido durante 10 minutos</p>
            
            <a href="">Confirmar Cuenta</a>`
    })
  }
}