const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, //Min 8 caracteres, 1 number, 1 uppercase
      },
    },
    rol: {
      type: DataTypes.ENUM("admin", "client", "guest"),
      defaultValue: "guest",
    },
    isGoogleAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  
  User.prototype.makeAdmin = function () {
    this.rol = 'admin';
    return this.save();
  };
};
