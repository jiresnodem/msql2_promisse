import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export class Role {
  static countRole = async () => {
    const sql = 'SELECT COUNT(*) AS count FROM `roles`';
    try {
      const [rows] = await pool.query(sql);
      return rows[0].count;
    } catch (error) {
      throw new Error('Error fetching roles');
    }
  };

  static readRoleById = async (id) => {
    const sql = 'SELECT * FROM `roles` WHERE `id` = ?';
    try {
      const [rows] = await pool.query(sql, [id]);

      return rows[0];
    } catch (error) {
      throw new Error('Error fechting role');
    }
  };

  static assignPermissions = async (roleId, permissionsArr, assignBy) => {
    const sql =
      'INSERT INTO `roles_has_permissions` (`role_id`, `permission_id`, `assign_by`) VALUES ?';

      console.log('====================================');
      console.log("assignBy", assignBy);
      console.log('====================================');

    try {
      const data = [];
      permissionsArr.forEach((permissionId) => {
        data.push([roleId, permissionId, assignBy]);
      });

      const [rows] = await pool.query({ sql, rowsAsArray: true }, [data]);

      return rows[0];
    } catch (error) {
      console.log('====================================');
      console.log("error",error);
      console.log('====================================');
      throw new Error('Error fechting role');
    }
  };
}
