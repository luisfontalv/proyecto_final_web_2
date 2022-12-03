module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(500), allowNull: false },
      lastname: { type: DataTypes.STRING(500), allowNull: false },
      state: { type: DataTypes.TINYINT(4), allowNull: false, defaultValue:1 },
    },
    {
      tableName: "clients",
      timestamps: false,
    }
  );
};
