'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Music.init({
    src: DataTypes.STRING,
    preview: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    title: DataTypes.STRING,
    artists: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};