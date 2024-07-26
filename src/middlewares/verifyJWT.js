import jwt from "jsonwebtoken";
import { env } from '../config/env.js';


export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    console.log('====================================');
    console.log("authHeader", authHeader);
    console.log('====================================');

    if (!authHeader) return res.status(401).json({ message: "Not token yet" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, env.accessTokenSecreteKey, (err, decoded) => {
        if (err) return res.status(401).json({ status: 401, message: "invalid token" });

        req.user = decoded.user;
        req.roles = decoded.roles;
        req.permissions = decoded.permissions;
        next();
    });
};