import DataTypes, { INTEGER } from "sequelize";
import { sequelize } from '../utils/dbConnection.js'


const Category = sequelize.define('Category', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "category"
})

export { Category }