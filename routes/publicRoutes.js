import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async(req, res)=>{

  try {
      const products = await prisma.products.findMany();
      return res.status(200).json(products);
  } catch (error) {
    return res.status(401).json({message: 'Erro'})
  } 
  
});

router.get('/product/:id', async(req, res)=>{
    try {
      const product = await prisma.products.findUnique({
        where:{
            idProduct: parseInt(req.params.id)
        } 
      });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
});

export default router;