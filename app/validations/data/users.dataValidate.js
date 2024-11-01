'use strict';

const ErrorUtilClass = require('@nerd/cmm/utils/error.util_class');
const ParseExpressValidatorUtilClass = require('@nerd/cmm/utils/parse_express_validator.util_class');
const ResponseUtilClass = require('@nerd/cmm/utils/response.util_class');
const { verifyUserExistService, getCodeService } = require('../../services/users.service');
const { CmmCreatePasswordService, CmmVerifyPasswordService } = require('@nerd/cmm/services/util.services');
module.exports = {
  /**
   * Validar los datos del registro de usuario.
   *
   * @param {*} _req
   * @param {*} _res
   * @param {*} _next
   * @returns
   */
  registerUserDataValidate: async (_req, _res, _next) => {
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      // Verificamos si tiene errores de formato
      const CHECK_ERRORS = new ParseExpressValidatorUtilClass(_req).byFormatValidate();
      if (!CHECK_ERRORS.isEmpty()) throw new ErrorUtilClass(__filename, 'TCG_DYT', CHECK_ERRORS.values()).returnValidate(false);

      const { username, email } = _req.body;

      const USER = await verifyUserExistService(username.toLowerCase(), email).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      if (USER) {
        CHECK_ERRORS.setDataValidate('username', 'el correo o nombre de usuario ya se encuentra en uso', username, 'TCG_DYT');
        throw new ErrorUtilClass(__filename, 'TCG_DYT', CHECK_ERRORS.values()).returnValidate();
      }

      return _next();
    } catch (_error) {
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error);
    }
  },

  /**
   * Validar los datos del registro de usuario.
   *
   * @param {*} _req
   * @param {*} _res
   * @param {*} _next
   * @returns
   */
  updateUserDataValidate: async (_req, _res, _next) => {
    const ND_RESPONSE = new ResponseUtilClass(_req, _res);
    try {
      // Verificamos si tiene errores de formato
      const CHECK_ERRORS = new ParseExpressValidatorUtilClass(_req).byFormatValidate();
      if (!CHECK_ERRORS.isEmpty()) throw new ErrorUtilClass(__filename, 'TCG_DYT', CHECK_ERRORS.values()).returnValidate(false);

      const { idUser } = _req.body;

      const USER = await verifyUserExistByIdService(idUser).catch((_error) => {
        throw new ErrorUtilClass(__filename, 'TCG_DYT').parseCatch(_error);
      });

      if (!USER) {
        CHECK_ERRORS.setDataValidate('idUser', 'el usuario no existe', idUser, 'TCG_DYT');
        throw new ErrorUtilClass(__filename, 'TCG_DYT', CHECK_ERRORS.values()).returnValidate();
      }

      _req.body.password = CmmCreatePasswordService(password);

      _req.ND.code = CODE;

      return _next();
    } catch (_error) {
      return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error);
    }
  },
};
