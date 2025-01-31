'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Link.belongsTo(models.User, { onDelete: 'cascade', onUpdate: 'cascade' })
      Link.hasMany(models.Log, { onDelete: 'cascade' })
    }
  }
  Link.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Link must be URL formated',
          },
        },
      },
      label: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Link',
    }
  )
  return Link
}
