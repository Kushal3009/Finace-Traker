import { sequelize } from '../utils/dbConnection.js';
import { SubCategory } from '../models/SubCategory.js';


export const createMultipleSubCategories = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { subcategories } = req.body; // Expecting an array of subcategory objects
        if (!Array.isArray(subcategories) || subcategories.length === 0) {
            return res.status(400).json({ status: 400, msg: "Please provide an array of subcategories" });
        }

        // Bulk create the subcategories
        await SubCategory.bulkCreate(subcategories, { transaction });

        await transaction.commit();
        res.status(201).json({ status: 201, msg: "Subcategories created successfully" });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, msg: "Error creating subcategories", error });
    }
}


export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { subcategory_name, category_id } = req.body;

        const subcategory = await SubCategory.findByPk(id);
        if (!subcategory) {
            return res.status(404).json({ status: 404, msg: "Subcategory not found" });
        }

        // ✅ Check for duplicate subcategory name
        const duplicateSubcategory = await SubCategory.findOne({ where: { subcategory_name } });
        if (duplicateSubcategory) {
            return res.status(409).json({ status: 409, msg: "Subcategory name already exists" });
        }

        subcategory.subcategory_name = subcategory_name;
        subcategory.category_id = category_id;
        await subcategory.save();

        res.status(200).json({ status: 200, msg: "Subcategory updated successfully", subcategory });

    } catch (error) {
        res.status(500).json({ status: 500, msg: "Error updating subcategory", error });
    }
}

export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategory = await SubCategory.findByPk(id);
        if (!subcategory) {
            return res.status(404).json({ status: 404, msg: "Subcategory not found" });
        }

        await subcategory.destroy();
        res.status(200).json({ status: 200, msg: "Subcategory deleted successfully" });

    } catch (error) {
        res.status(500).json({ status: 500, msg: "Error deleting subcategory", error });
    }
}