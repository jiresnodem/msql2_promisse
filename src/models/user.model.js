import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

class User {
  static countUser = async () => {
    const sql = 'SELECT COUNT(*) AS count FROM `users`';
    try {
      const [rows] = await pool.query(sql);
      return rows[0].count;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  };

  static readUserById = async (id) => {
    const sql = 'SELECT * FROM `users` WHERE `id` = ?';
    try {
      const [rows] = await pool.query(sql, [id]);

      return rows[0];
    } catch (error) {
      throw new Error('Error fechting user');
    }
  };

  static readUserByEmail = async (email) => {
    const sql = 'SELECT * FROM `users` WHERE `email` = ?';
    try {
      const [rows] = await pool.query(sql, [email]);

      return rows[0];
    } catch (error) {
      throw new Error('Error fechting user');
    }
  };

  static insertUser = async (data) => {
    const uuid = uuidv4();
    const sql =
      'INSERT INTO `users` (`id`, `email`, `password`, `fullName`,`otp`, `otp_expired_at`) VALUES (?, ?, ?, ?, ?, ?)';

    try {
      const [result] = await pool.query(sql, [
        uuid,
        data.email,
        data.password,
        data.fullName,
        data.otpCode,
        data.expdate,
      ]);

      let user = {};
      if (result.affectedRows) {
        user = await this.readUserById(uuid);
      }

      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
  };

  static confirmAccount = async ({ isVerify, id }) => {
    const sql = 'UPDATE `users` SET  `is_verify`= ?  WHERE `id` = ?';

    try {
      const [result] = await pool.query(sql, [isVerify, id]);

      let user = {};
      if (result.affectedRows) {
        user = await this.readUserById(id);
      }

      return user;
    } catch (error) {
      throw new Error('Error confirm user');
    }
  };
}

export default User;
