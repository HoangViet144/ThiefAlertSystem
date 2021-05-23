export default (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    infared: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    magnetic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Data;
};
