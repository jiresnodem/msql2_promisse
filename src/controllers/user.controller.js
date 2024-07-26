import response from '../helpers/response.js';
import User from '../models/user.model.js';
import * as Yup from 'yup';
import { ErrorResponse } from '../helpers/errorResponse.js';
import bcrypt from 'bcrypt';
import { transporter } from '../helpers/transporterMail.js';
import { env } from '../config/env.js';
import { NotFoundError } from '../helpers/notFoundError.js';
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const data = req.body;
  const schema = Yup.object({
    fullName: Yup.string('The full name field most be a string value')
      .required('The full name is required')
      .min(3, 'The full name must have at least 3 characters'),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4),
  });

  try {
    await schema.validate(data, { strict: true, abortEarly: false });

    const user = await User.readUserByEmail(data.email);
    if (user) res.status(409).json(response.error(409, 'User already exists'));

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    const result = await User.insertUser(data);

    if (result) {
      const info = await transporter.sendMail({
        from: env.mailUser, // sender address
        to: data.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });

      console.log('Message sent: %s', info.messageId);
    }

    return res
      .status(201)
      .json(
        response.success(201, 'Categorie retrieved successfully !!!', result),
      );
  } catch (error) {
    if (error.errors) {
      return next(new ErrorResponse(422, 'Validation failed', error.errors));
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  const data = req.body;

  try {
    //Verify if the user exists in our database
    const user = await User.readUserByEmail(data.email);
    if (!user) throw new NotFoundError("This user does not exist !!!");

    //Check , if the password match
    const match = await bcrypt.compare(data.password, user.password);

    if(!match) res.status(401).json(response.error(401, "Unauthenticated !!!", {}))

   const access_token = jwt.sign({
        user: {id:user.id, email: user.email, fullName: user.fullName},
        roles: ["admin"],
        permissions:["category-create"],
      }, env.accessTokenSecreteKey, { expiresIn: "15m"});

      const refresh_token = jwt.sign({
        user: {id:user.id, email: user.email, fullName: user.fullName},
      }, env.refreshTokenSecreteKey, { expiresIn: "1h"});

    return res
      .status(200)
      .json(response.success(200, 'User logger successfully !!!', {
        user,
        token:{
          type_token: "Bearer",
          access_token,
          refresh_token
        }
      }));
  } catch (error) {
    next(error);
  }
};
