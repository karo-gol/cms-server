import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "#root/helpers/jwt/auth";
import { sendRefreshToken } from "#root/helpers/jwt/sendRefreshToken";
import { User } from "../db/models/user";


const setupRoutes = app => {

    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if(!token) {
            return res.send({ ok: false, accessToken: ' ' });
        }

        let payload = null;
        try {
            payload = verify(token, accessEnv("REFRESH_TOKEN_SECRET"))
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: ' ' });
        }

        const user = await User.findOne({ where: { userId: payload.userId } });
        if(!user) {
            return res.send({ ok: false, accessToken: ' ' });
        }

        if(user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: ' ' });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
};

export default setupRoutes;