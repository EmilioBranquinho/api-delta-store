/*import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient();
const router = prisma.Router();

router.post('/user/cart', async(req, res)=>{

    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        }
    })

    await prisma.carrinho_has_produtos.create({
        data: {
            idCarrinho: 
            produto:
        }
    })
})*/