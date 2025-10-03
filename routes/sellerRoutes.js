import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import multer from 'multer';

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage ,  limits: { fileSize: 5 * 1024 * 1024 }})

router.post('/add', upload.single('cover'), async(req, res)=>{

    const imgPath = `files/${req.file.filename}`

    try {
        await prisma.products.create({
            data:{
                name: req.body.name,
                price: parseFloat(req.body.price),
                description: req.body.description,
                cover: imgPath
            }
        });
        return res.status(200).json({message: 'Produto adicionado com sucesso!'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Ocorreu um erro ao adicionar o produto"});
    }  

});

router.get('/products', async(req, res)=>{

  await prisma.products.findMany
})

export default router;