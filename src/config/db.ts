import mongoose from "mongoose"
import colors from 'colors'


export const connectDB = async () =>{
  try {
    const dbUrl = process.env.DB_URL
    if(!dbUrl){
      throw new Error('Algo salio mal')
    }

    const connection = await mongoose.connect(dbUrl)
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(colors.magenta.bold(`MongoDb conectado en ${url}`))
    
  } catch (error) {
    console.log(colors.red.bold('Error al conectar a la base da datos'))
    process.exit(1)
  }
}