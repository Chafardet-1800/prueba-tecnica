'use strict';
const Sequelize = require('sequelize');
const { CMM_SERVER } = require('@nerd/cmm/configs');
const CC_SEQUELIZE = CMM_SERVER.DatabasePg;

const personModel = require('./person.model');
const shoppingCartModel = require('./shoppingcart.model');

const Model = CC_SEQUELIZE.define(
  'users',
  {
    id_users: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING(100), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false },
    created_at: { type: Sequelize.DATEONLY, default: new Date() },
    updated_at: { type: Sequelize.DATEONLY, default: new Date() },
  },
  { tableName: 'users', timestamps: false }
);

Model.belongsTo(personModel, { foreignKey: 'fk_id_person', sourceKey: 'id_person' });
personModel.hasOne(Model, { foreignKey: 'fk_id_person' });

Model.belongsTo(shoppingCartModel, { foreignKey: 'fk_id_shoppingcart', sourceKey: 'id_person' });
shoppingCartModel.hasOne(Model, { foreignKey: 'fk_id_shoppingcart' });

module.exports = Model;
