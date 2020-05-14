import { sign } from "jsonwebtoken";
import accessEnv from "#root/helpers/accessEnv";

export const createAccessToken = (user) => {   
    return sign({ userId: user.userId }, accessEnv("ACCESS_TOKEN_SECRET"), { expiresIn: '15m' });
}

export const createRefreshToken = (user) => {
    return sign({ userId: user.userId, tokenVersion: user.tokenVersion }, accessEnv("REFRESH_TOKEN_SECRET"), { expiresIn: '7d' });
}