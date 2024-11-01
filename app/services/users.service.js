'use strict';

/* Models */
const { col, Op, literal, where, Sequelize } = require('sequelize');
const ErrorUtilClass = require('@nerd/cmm/utils/error.util_class');
const userModel = require('../models/users.model');

/* Modelos Profile */

module.exports = {
  /**
   * Service for register a new user
   * @type          :registerServices
   * @version       :0.0.1
   * @returns {Object|null} Return the new user created or null
   * @description   :The service register a new user in DB and return the new user created
   */
  verifyUserExistService: async (_username, _email) => {
    try {
      const WHERE_ARRAY = [];

      if (_username) {
        WHERE_ARRAY.push({ username: _username });
      }
      if (_email) {
        WHERE_ARRAY.push({ email: _email });
      }

      return await userModel
        .findOne({
          attributes: ['id_users', 'username', 'email'],
          where: {
            [Op.or]: WHERE_ARRAY,
          },
          raw: true,
        })
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },

  /**
   * Service for register a new user
   * @type          :registerServices
   * @version       :0.0.1
   * @returns {Object|null} Return the new user created or null
   * @description   :The service register a new user in DB and return the new user created
   */
  verifyUserExistByIdService: async (id_users) => {
    try {
      return await userModel
        .findOne({
          attributes: ['id_users', 'username', 'email'],
          where: {
            id_users: id_users,
          },
          raw: true,
        })
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },

  /**
   * Service for list users
   * @type          :getUsersList
   * @version       :0.0.1
   * @returns {Object|null} Return the user list or null
   * @description   :The service provide a list of users
   */
  getUsersList: async () => {
    try {
      return await userModel
        .findAll({
          where: {
            bol_delete: false,
          },
          attributes: ['id_users', 'username', 'email'],
          raw: false,
        })
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },
  
  /**
   * Service for users detail
   * @type          :getUserDetail
   * @version       :0.0.1
   * @returns {Object|null} Return the user detail or null
   * @description   :The service provide a detail of users
   */
  getUserDetail: async (id_users) => {
    try {
      return await userModel
        .findOne({
          where: {
            id_users: id_users,
          },
          attributes: ['id_users', 'username', 'email'],
          raw: false,
        })
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },

  /**
   * Service for register a new user
   * @type          :registerServices
   * @version       :0.0.1
   * @param {String} _email           - Email
   * @param {String} _username        - Username
   * @returns {Object|null} Return the new user created or null
   * @description   :The service register a new user in DB and return the new user created
   */
  registerUserService: async (_username, _email, _t) => {
    try {

      return await userModel
        .create(
          {
            username: _username,
            email: _email,
            created_at: new Date(),
            updated_at: new Date(),
          },
          { transaction: _t }
        )
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },

  /**
   * Service for updarte a user
   * @type          :updateService
   * @version       :0.0.1
   * @param {String} _email           - Email
   * @param {String} _username        - Username
   * @returns {Object|null} Return the user updated or null
   * @description   :The service update a user in DB and return the user updated
   */
  updateUserService: async (_idmember, _username, _email, _t) => {
    try {
      return await userModel
        .update(
          { 
            username: _username,
            email: _email,
          },
          {
            where: {
              id_users: _idmember,
            },
            transaction: _t,
            raw: true,
          }
        )
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },

  /**
   * Service for delete a user
   * @type          :deleteServices
   * @version       :0.0.4

   * @returns {Object|null} Return the new user created or null
   * @description   :The service delete a user in DB
   */
  deleteUserService: async (_idmember) => {
    try {
      return await userModel
        .update(
          {
            bol_delete: true,
          },
          {
            where: {
              id_users: _idmember,
            },
          }
        )
        .catch((_error) => {
          throw new ErrorUtilClass(__filename, 'TCG_DYT', _error).database();
        });
    } catch (_error) {
      throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
    }
  },
};
