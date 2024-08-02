import express from 'express';
import {
  destroyCategory,
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

// router.route('/').get(getAllCategories).post(postCategory);

// router
//   .route('/:id')
//   .get(getCategoryById)
//   .put(putCategory)
//   .delete(destroyCategory);

/**
 * @swagger
 * /api/categories:
 *  get:
 *      summary: This is is used to check if get method is working or not
 *      description: This api is used to check if get method is working on not
 *      responses:
 *          200:
 *              description: To test Get method
 * 
 */
router.get('/', getAllCategories);

router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.put('/:id', putCategory);
router.delete('/:id', destroyCategory);

export default router;
