const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShoppingCart = sequelize.define("shoppingCart", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
  });

  ShoppingCart.prototype.getProductsWithAmount = function() {
    let json = JSON.parse(this.content);
    let res = [];
    json.forEach(product => {
      res.push([product.id, product.amount]);
    });
    return res;
  }
};
