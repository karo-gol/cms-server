import { compare } from "bcryptjs";
import { createRefreshToken, createAccessToken } from "#root/helpers/jwt/auth";
import { sendRefreshToken } from "#root/helpers/jwt/sendRefreshToken";
import { User } from "#root/db/models/user";

const loginUserResolver = async (obj, { login, password }, context) => {
    const user = await User.findOne({ where: {login} });

    if(!user) {
        throw new Error("Could not find user.");
    }

    const valid = await compare(password, user.password);

    if(!valid) {
        throw new Error("Wrong password!");
    }

    sendRefreshToken(context.res, createRefreshToken(user));

    return {
        accessToken: createAccessToken(user),
        user
    };
};

export default loginUserResolver;