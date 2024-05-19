const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Follow = sequelize.define('Follow', {
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Follow;
