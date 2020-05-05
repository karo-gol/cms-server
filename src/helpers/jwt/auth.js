import { sign } from "jsonwebtoken";
import accessEnv from "#root/helpers/accessEnv";

export const createAccessToken = (user) => {   
    return sign({ userId: user.id }, accessEnv("ACCESS_TOKEN_SECRET"), { expiresIn: '15m' });
}

export const createRefreshToken = (user) => {
    return sign({ userId: user.id, tokenVersion: user.tokenVersion }, accessEnv("REFRESH_TOKEN_SECRET"), { expiresIn: '7d' });
}