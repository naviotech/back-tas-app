import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
  origin: function(origin, callback){
    const whiteList = [process.env.FRONTEND]
    if(!origin || whiteList.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error('Error de cors'))
    }
  }
}