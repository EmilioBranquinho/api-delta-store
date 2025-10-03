import express from 'express';
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js';
import AuthRoutes from './routes/authRoutes.js'
import PublicRoutes from './routes/publicRoutes.js'
import AdminRoutes from './routes/adminRoutes.js';
import SellerRoutes from './routes/sellerRoutes.js';
import BothRoutes from './routes/bothRoutes.js'
import auth from './middlewares/auth.js';
import Authorizeroles from './middlewares/role.js';

const app  = express();
app.use(express.json());

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));

const prisma = new PrismaClient();

const PORT = 7000;

app.use('/files', express.static('uploads'));
app.use('/', PublicRoutes);
app.use('/auth', AuthRoutes)
app.use('/users', auth, Authorizeroles("USER", "ADMIN", "SELLER"), BothRoutes);
app.use('/seller', auth, Authorizeroles("SELLER"), SellerRoutes);
app.use('/admin', auth, Authorizeroles("ADMIN"), AdminRoutes);
app.listen(PORT)
console.log(`Servidor rodando na porta ${PORT}`)

/*
    Criar API de Usuarios
    -Cadastrar usuarios
    -Listar usuarios
    -Atualizar dados do usuario
    -Deletar um usuario
*/