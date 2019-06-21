'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.todo, {
      foreignKey: 'userId',
      as: 'todos'
    });
  };
  return user;
};
