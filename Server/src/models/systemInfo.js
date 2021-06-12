export default (sequelize, DataTypes) => {
  const SystemInfo = sequelize.define('SystemInfo', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ON',
    },
    setting: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: { start: '21:00:00', end: '06:00:00' },
    },
  });

  return SystemInfo;
};
