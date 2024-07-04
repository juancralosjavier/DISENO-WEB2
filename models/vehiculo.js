'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehiculo.init({
    idvehiculo: DataTypes.INTEGER,
    placa: DataTypes.STRING,
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    color: DataTypes.STRING,
    propietario: DataTypes.STRING,
    fecharegistro: DataTypes.DATE,
    estadoregistro: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vehiculo',
  });
  return Vehiculo;
};