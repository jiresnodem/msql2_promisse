import Category from '../models/category.model.js';
import response from '../helpers/response.js';
import { NotFoundError } from '../helpers/notFoundError.js';

export const getAllCategories = async (req, res, next) => {
  const { limit, page } = req.query;

  const sort = {
    limit: +limit || limit ? +limit : 2,
    page: +page || page ? +page : 1,
  };

  try {
    const result = await Category.readAllCategories(sort);
    return res
      .status(200)
      .json(
        response.success(200, 'Categories retrieved successfully !!!', result),
      );
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Category.readCategoryById(id);
    return res
      .status(200)
      .json(
        response.success(200, 'Categorie retrieved successfully !!!', result),
      );
  } catch (error) {
    next(error);
  }
};

export const postCategory = async (req, res, next) => {
  const data = req.body;

  console.log('====================================');
  console.log("req.user", req.user);
  console.log("req.roles", req.roles);
  console.log("req.permissions", req.permissions);
  console.log('====================================');

  try {
    const result = await Category.insertCategory(data);
    return res
      .status(201)
      .json(response.success(201, 'Category created successfully !!!', result));
  } catch (error) {
    next(error);
  }
};

export const putCategory = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const category = await Category.readCategoryById(id);
    if (!category) {
      throw new NotFoundError('Category not found !!!');
    }

    const result = await Category.updateCategory(id, data);

    return res
      .status(200)
      .json(
        response.success(200, 'Categorie updated successfully !!!', result),
      );
  } catch (error) {
    next(error);
  }
};

export const destroyCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.readCategoryById(id);
    if (!category) {
      throw new NotFoundError('Category not found !!!');
    }

    await Category.deleteCategory(id);
    return res
      .status(200)
      .json(
        response.success(200, 'Categorie deleted successfully !!!', category),
      );
  } catch (error) {
    next(error);
  }
};
