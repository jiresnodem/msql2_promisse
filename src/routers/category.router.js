import express from 'express';
import {
  destroyCategory,
  getAllCategories,
  getCategoryById,
  postCategory,
  putCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(postCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(putCategory)
  .delete(destroyCategory);

// router.get('/', getAllCategories);
// router.get('/:id', getCategoryById);
// router.post('/', postCategory);
// router.put('/:id', putCategory);
// router.delete('/:id', destroyCategory);

export default router;
