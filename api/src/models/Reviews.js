const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('reviews', {
        commentary : {
            type : DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type : DataTypes.INTEGER,
            allowNull: false
        }
    });
}  

//*ver si podemos limitar el rating a 5
