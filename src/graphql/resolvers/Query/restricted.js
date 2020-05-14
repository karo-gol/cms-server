import { isAuth } from "#root/helpers/jwt/isAuth";

const restrictedResolver = async (obj, args, context) => {   
    
    await isAuth(context);  
   
    return `Bye user id = ${context.payload.userId}`; 
}

export default restrictedResolver;