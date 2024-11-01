'use strict';

// Imports Common
const ResponseUtilClass = require('@nerd/cmm/utils/response.util_class');
const ErrorUtilClass = require('@nerd/cmm/utils/error.util_class');
const { CmmNewTransactionService } = require('@nerd/cmm/services/util.services');
const { getUsersList, getUserDetail, updateUserService } = require('../services/users.service');


module.exports = {

  /**
   *
   * Tracking-code  :CFIAT-CPRO
   * Lang-code      :TL-CFIAT-CPRO
   * @type          :Controller
   * @version       :1.0.0
   * @description   :Lista los usuarios existentes  
   *
   */
  listUsersController: async (_req, _res) => {
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      const USERS = await getUsersList().catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });
      return ND_RESPONSE.send('listado de productos.', USERS, 'TCG_DYT');
    } catch (_error) {
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'CPROE015', _error).server() : _error);
    }
  },

  /**
   *
   * Tracking-code  :CFIAT-CPRO
   * Lang-code      :TL-CFIAT-CPRO
   * @type          :Controller
   * @version       :1.0.0
   * @description   :Lista los usuarios existentes  
   *
   */
  detailUsersController: async (_req, _res) => {
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {

      const { idUser } = _req.query;

      const USERS = await getUserDetail(idUser).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });
      return ND_RESPONSE.send('listado de productos.', USERS, 'TCG_DYT');
    } catch (_error) {
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'CPROE015', _error).server() : _error);
    }
  },

  /**
   *
   * Tracking-code  :CFIAT-CPRO
   * Lang-code      :TL-CFIAT-CPRO
   * @type          :Controller
   * @version       :1.0.0
   * @description   :registrar un nuevo usuario
   *
   */
  registerUserController: async (_req, _res) => {
    let DB_T;
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      const { username, email } = _req.body;

      DB_T = await CmmNewTransactionService().catch((_error) => {
        throw new ErrorUtilClass(__filename, 'CPROE001').parseCatch(_error);
      });

      await registerUserService(username, email, DB_T).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      await DB_T.commit();
      return ND_RESPONSE.send('usuarios registrado', true, 'TCG_DYT');
    } catch (_error) {
      if (DB_T) await DB_T.rollback();
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'CPROE015', _error).server() : _error);
    }
  },

  /**
   *
   * Tracking-code  :CFIAT-CPRO
   * Lang-code      :TL-CFIAT-CPRO
   * @type          :Controller
   * @version       :1.0.0
   * @description   :verificar si el usuario ya existe
   *
   */
  updateUserController: async (_req, _res) => {
    let DB_T;
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      DB_T = await CmmNewTransactionService().catch((_error) => {
        throw new ErrorUtilClass(__filename, 'CPROE001').parseCatch(_error);
      });

      const { idUser, username, email } = _req.body;

      await updateUserService(idUser, username, email, DB_T).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      await DB_T.commit();
      return ND_RESPONSE.send('contraseña actualizada.', _req.ND.user, 'TCG_DYT');
    } catch (_error) {
      if (DB_T) await DB_T.rollback();
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'CPROE015', _error).server() : _error);
    }
  },

  /**
   *
   * Tracking-code  :CFIAT-CPRO
   * Lang-code      :TL-CFIAT-CPRO
   * @type          :Controller
   * @version       :1.0.0
   * @description   :verificar si el usuario ya existe
   *
   */
  deleteUserController: async (_req, _res) => {
    let DB_T;
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      const { idUser } = _req.query;

      DB_T = await CmmNewTransactionService().catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      await deleteProductcartService(idUser).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      await DB_T.commit();
      return ND_RESPONSE.send('Usuario eliminado', true, 'TCG_DYT');
    } catch (_error) {
      if (DB_T) await DB_T.rollback();
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error);
    }
  },
};
