import response from "../helpers/response.js";
import { Role } from "../models/role.model.js";


export const assignPermission = async  (req, res, next)=>{
    const { role_id, permissions } = req.body;
    const user = req.user;

    console.log('====================================');
    console.log("user", user);
    console.log('====================================');
  
    try {
      //Verify if the user exists in our database
      const role = await Role.readRoleById(role_id);
      if (!role) throw new NotFoundError('This role does not exist !!!');
  
      const result = await Role.assignPermissions(role_id, permissions, user.id);
  
      return res
        .status(201)
        .json(
          response.success(200, 'Assingned permissions to role successfully !!!', result),
        );
    } catch (error) {
      next(error);
    }
  };