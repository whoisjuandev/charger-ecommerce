const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("img", {
    url: {
      type: DataTypes.STRING,
      alowNull: false,
      validate: {
        isUrl: true,
      },
    },
  });
};
