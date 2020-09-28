const { DataTypes } = require("sequelize");
// const { ShoppingCart } = require("../db");

module.exports = (sequelize) => {
  const checkout = sequelize.define("checkout", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    shippingAdress: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  });

  checkout.prototype.genToken = function genToken() {
    let res = "";
    let src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 6; i++) {
      res += src[Math.floor(Math.random() * src.length)];
    }

    this.token = res;
    return this.save();
  };
  // checkout.prototype.cancelOrder = function cancelOrded() {
  //   return new Promise((res, rej) => {
  //     if(this.state !== 'complete' && this.state !== 'canceled') {
  //       checkout.findOne({ where: { id: this.id }, include: ShoppingCart })
  //         .then(shoppingCart => {
  //           let productsWithAmount = shoppingCart.getProductsWithAmount();

  //           productsWithAmount.map(async prod => {
  //             let product = await Product.findOne({where: { id: prod[0] }});
  //             product.stock += prod[1];
  //             product.save();
  //           });
  //           this.state = 'canceled';
  //           res(this.save());
  //         }).catch(err => {
  //           console.error(err);
  //           rej(err);
  //         })
  //     } else {
  //       rej(new Error('You can\'t cancel completed or canceled orders.'));
  //     }
  //   });
  // }
};
