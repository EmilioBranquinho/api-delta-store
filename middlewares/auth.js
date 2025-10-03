import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) =>{
    const token = req.headers.authorization

    if(!token) {
       return res.status(401).json({message: "Acesso Negado, voce nao tem token!"}) 
    }

    try { 
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET )
         req.user = decoded;
        //console.log(req.user.roles)
        next();
    } catch (error) {
       console.log(error)
       res.status(401).json({message: 'Token Invalido'})
    }

}

export default auth;