import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async(req, res) =>{
    try{

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    await prisma.user.create({
        data:{
          email : req.body.email,
          name: req.body.name,
          password: hashPassword ,
          role: {
            connect: {name: 'USER'}
          }
        }
    });

    // await prisma.carrinho.create({
    //     data: {
    //         idUsuario: user.id
    //     }
    // })

     res.status(201).json({message: "Usuario cadastrado com sucesso!"});

 } catch (err) {
    if(err.code === 'P2002'){
     return res.status(409).json({message: "Erro, ja existe um usuario com este email!"});
             
     }
        return res.status(500).json({message: "Erro no servidor"})
}});

router.post('/login', async(req,res)=>{
    try {
      const userInfo = req.body 

      //verifica se o usuario existe no banco de dados
      const user = await prisma.user.findUnique({
        where: {
            email: userInfo.email,     
        },
        include :{
          role: true
        }
      });

      //se o usuario nao existir, ele da erro
      if(!user){
        return res.status(404).json({message: 'Erro, o usuario nao existe'})
      }

    const isMatch = await bcrypt.compare(userInfo.password, user.password)

    if(!isMatch){
      res.status(400).json({message: "Senha invalida!"});   
    }    
      //se existir, gera um token
      const token = jwt.sign({id: user.id, role: user.role.name},  JWT_SECRET, {expiresIn: "50m"} );
      const idUser = user.id;
      const nameUser = user.name;
      const role = user.role;
      //se existir, ele retorna os dados do usuario
      res.status(200).json({token, idUser, nameUser, role})
      //console.log(role)
    } catch (error) {
      console.log(error)
        return res.json(error)
    }
});

export default router;