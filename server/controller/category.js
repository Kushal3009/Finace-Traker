import { sequelize } from '../utils/dbConnection.js';
import { Category } from '../models/Category.js';
import { SubCategory } from '../models/SubCategory.js';

export const createCategory = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ status: 400, msg: "Please provide a Category Name" });
        }

        // ✅ Check if category already exists
        const existingCategory = await Category.findOne({ where: { category_name } });
        if (existingCategory) {
            return res.status(409).json({ status: 409, msg: "Category already exists" });
        }

        const category = await Category.create({ category_name }, { transaction });
        await transaction.commit();
        res.status(201).json({ status: 201, msg: "Category created successfully", category });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, msg: "Error creating category", error });
    }
}

export const createMultipleCategory = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { categories } = req.body; // Expecting an array of category names

        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ status: 400, msg: "Please provide an array of category names" });
        }

        // ✅ Check if any category already exists
        const existingCategories = await Category.findAll({
            where: { category_name: categories }
        });

        if (existingCategories.length > 0) {
            return res.status(409).json({ status: 409, msg: "Some categories already exist", existingCategories });
        }

        const newCategories = categories.map(name => ({ category_name: name }));
        await Category.bulkCreate(newCategories, { transaction });

        await transaction.commit();
        res.status(201).json({ status: 201, msg: "Categories created successfully" });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, msg: "Error creating categories", error });
    }
}



export const updateCategory = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        const { id } = req.params;
        const { category_name } = req.body;

        const category = await Category.findByPk(id, { transaction });
        if (!category) {
            return res.status(404).json({ status: 404, msg: "Category not found" });
        }

        // ✅ Check for duplicate category name
        const duplicateCategory = await Category.findOne({ where: { category_name } }, { transaction });
        if (duplicateCategory) {
            return res.status(409).json({ status: 409, msg: "Category name already exists" });
        }

        category.category_name = category_name;
        await category.save();


        await transaction.commit()
        res.status(200).json({ status: 200, msg: "Category updated successfully", category });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, msg: "Error updating category", error });
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ status: 404, msg: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ status: 200, msg: "Category deleted successfully" });

    } catch (error) {
        res.status(500).json({ status: 500, msg: "Error deleting category", error });
    }
}

export const getCategory = async (req, res) => { // ✅ Fixed typo in route name
    try {
        const categories = await Category.findAll({
            include: {
                model: SubCategory,
                as: 'subcategories' // ✅ Make sure alias matches model association
            }
        });

        res.status(200).json({ status: 200, categories });
    } catch (error) {
        res.status(500).json({ status: 500, msg: "Error fetching categories", error });
    }
}
