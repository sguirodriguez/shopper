import { Model } from "sequelize";
import sequelize from "sequelize";
import db from "./index";
import Customers from "./customers";

class Measures extends Model {
  declare id: number;
  declare uuid: string;
  declare customer_id: number;
  declare image_data: string;
  declare value: string;
  declare confirmed_value: string;
  declare type: "water" | "gas";
  declare measure_datetime: string;
  declare created_at: string;
  declare updated_at: string;
}

Measures.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true
    },
    customer_id: {
      type: sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id"
      }
    },
    image_data: {
      type: sequelize.TEXT
    },
    image_extension: {
      type: sequelize.STRING(32)
    },
    value: {
      type: sequelize.INTEGER
    },
    confirmed_value: {
      type: sequelize.INTEGER
    },
    type: {
      type: sequelize.ENUM("water", "gas")
    },
    measure_datetime: {
      type: sequelize.DATE
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
    tableName: "measures",
    underscored: true
  }
);

Measures.belongsTo(Customers, {
  foreignKey: "customer_id",
  as: "customers"
});

export default Measures;
