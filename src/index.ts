import server from './server'
import colors from 'colors'


const port = process.env.PORT || 4000

server.get(('/'),(req,res)=>{
  res.send("<h1>My server</h1>")
})

server.use((req,res)=>{
  res.send("<h1>404 PAGE NOT FOUND</h1>")
})

server.listen(port, ()=>{
  console.log(`Api funcionando en ${colors.cyan.bold(`http://localhost:${port}`)}`)
})

