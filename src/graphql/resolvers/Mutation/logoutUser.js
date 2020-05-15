import sendRefreshToken from "#root/helpers/jwt/sendRefreshToken";

const logoutUserResolver = (obj, args, context) => {
    sendRefreshToken(context.res, "");
    return true;
};

export default logoutUserResolver;
