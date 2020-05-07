import { sendRefreshToken } from "#root/helpers/jwt/sendRefreshToken";
import { User } from "#root/db/models/user";

const logoutUserResolver = (obj, args, context) => {
    sendRefreshToken(context.res, "");
    return true;
};

export default logoutUserResolver;
