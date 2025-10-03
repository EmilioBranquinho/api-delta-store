import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/usuarios', async(req,res)=>{
    
    try {
        const users =  await prisma.user.findMany({
            include: {
                role: true
            }
        });
        return res.status(200).json(users)
    } catch (error) {
        return res.status(403).json(error)
    }

    
});

router.delete('/delete', async(req, res)=>{
    try{
        await prisma.user.delete({
        where: {
            id: req.body.id
        },
        
    });
    return res.status(200).json({message: 'Usuario deletado com sucesso!'})
 } catch (error) {
    console.log(error)
    return res.status(400).json(error)
 }
    
});

router.put('/update', async(req, res)=>{
    try {
         await prisma.user.update({
        where:{
            id: req.body.id
        },
        data:{
            name: req.body.name,
            email: req.body.email,
            roleId: req.body.roleID
        }
    });
        return res.status(200).json({message: 'Dados do usuario atualizados com sucesso!'})

 } catch (error) {
    console.log(error)
    return res.status(400).json(error)  
    
 }
   });
   

export default router;