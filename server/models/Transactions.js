import { DataTypes } from "sequelize";
import { sequelize } from "../utils/dbConnection.js";
import { Category } from "./Category.js";
import { SubCategory } from "./SubCategory.js";

const Transactions = sequelize.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "id"
        },
        allowNull: false
    },
    sub_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: SubCategory,
            key: "id"
        },
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'transactions'
})

export { Transactions }