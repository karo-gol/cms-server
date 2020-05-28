import { verify } from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '#root/helpers/jwt/auth';
import sendRefreshToken from '#root/helpers/jwt/sendRefreshToken';
import { User } from '../db/models/user';
import accessEnv from '#root/helpers/accessEnv';

const setupRoutes = app => {

    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid;
        const failure = { ok: false, accessToken: '' };

        if(!token) {
            return res.send(failure);
        }       
        
        let payload = null;
        try {
            payload = verify(token, accessEnv('REFRESH_TOKEN_SECRET'));            
        } catch (err) {           
            //console.log(err);
            return res.send(failure);
        }

        const user = await User.findOne({ where: { id: payload.userId } });
        if(!user) {
            return res.send(failure);
        }

        sendRefreshToken(res, createRefreshToken(user));        

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
};

export default setupRoutes;