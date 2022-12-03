module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "ValorParametro",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        valor_parametro: { type: DataTypes.STRING(500), allowNull: false },
        estado: { type: DataTypes.TINYINT(4), allowNull: false, defaultValue: 1 },
        
        id_parametros: { type: DataTypes.BIGINT, allowNull: false },        
      },
      {
        tableName: "valor_parametro",
        timestamps: false,
      }
    );
  };
  