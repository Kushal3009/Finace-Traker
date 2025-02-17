import express from 'express';
import { createSubCategory, deleteSubCategory, updateSubCategory } from '../controller/subcategory.js'
const router = express.Router();

/**
 * ✅ Create Single Subcategory
 */
router.post('/create-subcategory', createSubCategory);

/**
 * ✅ Update Subcategory
 */
router.put('/update-subcategory/:id', updateSubCategory);

/**
 * ✅ Delete Subcategory
 */
router.delete('/delete-subcategory/:id', deleteSubCategory);

export default router;
