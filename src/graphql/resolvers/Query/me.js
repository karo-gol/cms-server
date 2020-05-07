import accessEnv from "#root/helpers/accessEnv";
import { verify } from "jsonwebtoken";
import { User } from "#root/db/models/user";

const meResolver = async (obj, args, context) => {
    const authorization = context.req.headers['authorization'];

    if(!authorization) {
        return null;
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, accessEnv("ACCESS_TOKEN_SECRET"));

        return await User.findByPk(payload.userId);
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default meResolver;