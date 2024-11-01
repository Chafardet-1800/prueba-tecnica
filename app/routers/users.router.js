'use strict';

const { registerUserController, updateUserController, detailUsersController, listUsersController } = require('../controllers/users.controller');
const { registerUserDataValidate, updateUserDataValidate } = require('../validations/data/users.dataValidate');
const { userFormatValidate } = require('../validations/format/users_validator');

const Router = require('express').Router();

/**
 *
 * @version       :1.0.0
 * @memberof
 * @description
 * @function
 * @inner
 * @returns {Promise<t.HttpResponse>}
 *
 */

Router.get('/v1/users', listUsersController);

/**
 *
 * @version       :1.0.0
 * @memberof
 * @description
 * @function
 * @inner
 * @returns {Promise<t.HttpResponse>}
 *
 */

Router.get('/v1/users:id', detailUsersController);

/**
 *
 * @version       :1.0.0
 * @memberof
 * @description
 * @function
 * @inner
 * @returns {Promise<t.HttpResponse>}
 *
 */

Router.post('/v1/users', userFormatValidate(), registerUserDataValidate, registerUserController
);

/**
 *
 * @version       :1.0.0
 * @memberof
 * @description
 * @function
 * @inner
 * @returns {Promise<t.HttpResponse>}
 *
 */

Router.put('/v1/users', updateUserDataValidate, updateUserController);

/**
 *
 * @version       :1.0.0
 * @memberof
 * @description
 * @function
 * @inner
 * @returns {Promise<t.HttpResponse>}
 *
 */

Router.delete('/v1/users', updateUserDataValidate, updateUserController);

module.exports = Router;
