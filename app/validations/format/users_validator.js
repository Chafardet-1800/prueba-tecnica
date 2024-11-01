'use strict';

const { ErrorUtilClass } = require('@nerd/cmm/utils/error.util_class');
const { CmmStringParam, CmmEmailParam } = require('@nerd/cmm/validations/format/params/util.param');

exports.userFormatValidate = () => {
  try {
    return [
      CmmStringParam('username', 'body'),
      CmmEmailParam('email', 'body')
    ];
  } catch (_error) {
    throw !_error.errorType ? new ErrorUtilClass(__filename, 'TCG_DYT', _error).server() : _error;
  }
};