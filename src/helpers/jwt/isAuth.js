import { verify } from "jsonwebtoken";
import accessEnv from "#root/helpers/accessEnv";

export const isAuth = (context) => {
    
    const authorization = context.req.headers['authorization'];   

    if(!authorization) {
        throw new Error("not authenticated");
    }    

    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, accessEnv("ACCESS_TOKEN_SECRET"));
    
        context.payload = payload;

    } catch (err) {
        console.log(err);
        throw new Error("not authenticated");
    }

    return;
}