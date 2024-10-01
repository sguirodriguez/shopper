import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "./index";

class Customers extends Model {
  declare id: number;
  declare name: string;
  declare document: string;
  declare created_at: string;
  declare updated_at: string;
}

Customers.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: sequelize.STRING(255),
      allowNull: false
    },
    document: {
      type: sequelize.STRING(11),
      unique: true
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "customers",
    underscored: true
  }
);

export default Customers;
