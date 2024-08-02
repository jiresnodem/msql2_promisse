import swaggerJSDoc from 'swagger-jsdoc';
import { env } from './env.js';

const options ={
    definition: {
      openapi: '3.0.0',
      info:{
        title: "Getsmartershop",
        version: '1.0.0',
      },
      servers:[
        {
          url: `http://${env.hostName}:${env.port}`
        }
      ]
    },
    apis:['./src/routers/*.js']
  };
  
const swaggerSpec = swaggerJSDoc(options);
  
 export default swaggerSpec;