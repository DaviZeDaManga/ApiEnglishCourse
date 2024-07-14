import 'dotenv/config'

import express from "express"
import cors from "cors"

import userController from './controller/userController.js'
import alunoController from './controller/alunoController.js'

const server = express()
server.use(cors())
server.use(express.json())

server.use(userController)
server.use(alunoController)

server.listen(process.env.PORT, ()=> console.log(`Api: conectada! \nPorta: ${process.env.PORT} \nNome: EnglishCourse`))