import nodemailer from "nodemailer";
import { env } from "../config/env.js";


const testAccount = await nodemailer.createTestAccount();


export const transporter = nodemailer.createTransport({
  host:  env.nodeEnv === "developpement" ? "localhost" : env.mailHost,
  port: env.mailPort,
  secure: false, 
  auth: {
    user: env.nodeEnv === "developpement" ? testAccount.user : env.mailUser,
    pass:  env.nodeEnv === "developpement" ? testAccount.pass : env.mailPassword, 
  },
});