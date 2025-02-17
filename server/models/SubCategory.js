import { DataTypes } from "sequelize";
import { sequelize } from "../utils/dbConnection.js";
import { Category } from "./Category.js";


const SubCategory = sequelize.define('subCategorySchema', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'subcategory'
})

export { SubCategory }