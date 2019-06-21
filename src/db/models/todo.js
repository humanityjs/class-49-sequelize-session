'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define(
    'todo',
    {
      name: {
        type: DataTypes.STRING,
        required: true
      },
      completed: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    },
    {}
  );
  todo.associate = function(models) {
    // associations can be defined here
    todo.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return todo;
};
