import { pool } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

class Category {
  static countCategory = async () => {
    const sql = 'SELECT COUNT(*) AS count FROM `categories`';
    try {
      const [rows] = await pool.query(sql);
      return rows[0].count;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  };

  static readAllCategories = async ({ limit, page }) => {
    const sql =
      'SELECT * FROM `categories` ORDER BY `created_at` DESC  LIMIT ? OFFSET ?';

    const offset = limit * (page - 1);

    try {
      const count = await this.countCategory();
      const [rows] = await pool.query(sql, [limit, offset]);

      rows.map((item) => {
        item.created_at = item.created_at
          ? format(item.created_at, 'dd-MM-yyyy HH:mm:ss')
          : item.created_at;
        item.updated_at = item.updated_at
          ? format(item.updated_at, 'dd-MM-yyyy HH:mm:ss')
          : item.updated_at;
      });

      return {
        categories: rows,
        links: {
          prevPage: page - 1,
          currentPage: page,
          nextPage: page + 1,
          take: limit,
          totalItem: count,
          totalPage: Math.ceil(count / limit),
        },
      };
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw new Error('Error fetching products');
    }
  };

  static readCategoryById = async (id) => {
    const sql = 'SELECT * FROM `categories` WHERE `id` = ?';
    try {
      const [rows] = await pool.query(sql, [id]);

      return rows[0];
    } catch (error) {
      throw new Error('Error creating product');
    }
  };

  static insertCategory = async (data) => {
    const uuid = uuidv4();
    const sql =
      'INSERT INTO `categories` (`id`, `name`, `description`) VALUES (?, ?, ?)';

    try {
      const [result] = await pool.query(sql, [
        uuid,
        data.name,
        data.description,
      ]);

      let category = {};
      if (result.affectedRows) {
        category = await this.readCategoryById(uuid);
      }

      return category;
    } catch (error) {
      throw new Error('Error creating product');
    }
  };

  static updateCategory = async (id, data) => {
    const sql =
      'UPDATE `categories` SET `name`= ?, `description`= ? WHERE `id` = ?';

    try {
      const [result] = await pool.query(sql, [data.name, data.description, id]);

      let category = {};
      if (result.affectedRows) {
        category = await this.readCategoryById(id);
      }

      return category;
    } catch (error) {
      throw new Error('Error creating product');
    }
  };

  static deleteCategory = async (id) => {
    const sql = 'DELETE FROM `categories`  WHERE `id`= ?';
    try {
      const [result] = await pool.query(sql, [id]);

      return result.affectedRows;
    } catch (error) {
      throw new Error('Error creating product');
    }
  };
}

export default Category;
