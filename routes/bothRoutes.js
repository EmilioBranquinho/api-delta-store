import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/usuarios/:id', async(req, res)=>{
    const userData = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    })

    return res.status(200).json(userData);
});

export default router;