import { sequelize } from '../utils/dbConnection.js';
import { Category } from '../models/Category.js';
import { SubCategory } from '../models/SubCategory.js';


Category.hasMany(SubCategory, {
    foreignKey: 'category_id', // The foreign key in SubCategory
    as: 'subcategories'        // The alias name for subcategories
});

SubCategory.belongsTo(Category, {
    foreignKey: 'category_id', // The foreign key in SubCategory
    as: 'category'             // The alias name for category
});


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
        console.log(categories)
        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ status: 400, msg: "Please provide an array of category names" });
        }

        const category_data = categories.map(cat => ({
            category_name: cat,
            status: true
        }))

        await Category.bulkCreate(category_data, { transaction });

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

export const getCategoriesWithSubcategories = async (req, res) => {
    try {
        // Fetch categories along with their associated subcategories
        const categories = await Category.findAll({
            include: [{
                model: SubCategory,
                as: 'subcategories'  // This should match the alias set in `hasMany`
            }]
        });

        res.status(200).json({
            status: 200,
            categories: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            msg: "Error fetching categories and subcategories",
            error: error.message
        });
    }
};
