module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "Premio",
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: { type: DataTypes.STRING(500), allowNull: false },
        fecha: { type: DataTypes.DATEONLY, allowNull: false },
  
        estado: { type: DataTypes.TINYINT(4), allowNull: false, defaultValue: 1 },
        id_deportistas: { type: DataTypes.BIGINT, allowNull: false },        
      },
      {
        tableName: "premio",
        timestamps: false,
      }
    );
  };
  