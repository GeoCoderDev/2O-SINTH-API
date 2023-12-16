const connectionSequelize = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Effect = connectionSequelize.define("Effect", {
  Name: {
    type: DataTypes.STRING(40),
    primaryKey: true,
  },
  Effect: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  User_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "Id",
    },
  },
},{
    timestamps: false
});

module.exports = Effect;