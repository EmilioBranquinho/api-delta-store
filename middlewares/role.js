const Authorizeroles = (...allowedRoles) =>{  
    return async(req, res, next) => {
       
      const userRole = req.user.role
      
      if(allowedRoles.includes(userRole)){
        next();
      } else {
            return res.status(403).json({message: "Acesso negado, permissao insuficiente!"})
      }
      
    }
}


export default Authorizeroles;