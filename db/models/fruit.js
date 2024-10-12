'use strict';

const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');


const fruit = sequelize.define('fruits', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'name cannot be null'
      },
      notEmpty: {
        msg: 'name cannot be empty'
      }
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'color cannot be null'
      },
      notEmpty: {
        msg: 'color cannot be empty'
      }
    }
  },
  price: {
    type: DataTypes.DECIMAL(18, 4),
    allowNull: false,
    defaultValue: 0,
    validate: {
      notNull: {
        msg: 'price cannot be null'
      },
      notEmpty: {
        msg: 'price cannot be empty'
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
},
{
  paranoid: true
});



module.exports = fruit;