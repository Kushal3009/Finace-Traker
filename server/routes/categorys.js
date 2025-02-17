import express from 'express';
import { createCategory, createMultipleCategory, deleteCategory, getCategory, updateCategory } from '../controller/category.js'

const router = express.Router();

/**
 * ✅ Create Single Category
 */
router.post('/create-category', createCategory);

/**
 * ✅ Create Multiple Categories
 */
router.post('/create-multiple-categories', createMultipleCategory);

/**
 * ✅ Update Category
 */
router.put('/update-category/:id', updateCategory);

/**
 * ✅ Delete Category
 */
router.delete('/delete-category/:id', deleteCategory);


router.get('/get-categories', getCategory);

export default router;
