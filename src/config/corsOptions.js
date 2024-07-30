import { env } from "./env.js";


export const  corsOptions = {
    origin: function (origin, callback) {
      if ((env.nodeEnv !== "production" && !origin) || env.allowOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
}};