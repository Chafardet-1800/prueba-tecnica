// @ts-nocheck
'use strict';

const Express = require('express');
const UserAgent = require('express-useragent');
const Cors = require('cors');
// CMM PACKAGE
const MorganMiddleware = require('@nerd/cmm/middlewares/morgan.middleware');
const ResponseUtilClass = require('@nerd/cmm/utils/response.util_class');
const ErrorUtilClass = require('@nerd/cmm/utils/error.util_class');
const LogUtilClass = require('@nerd/cmm/utils/log.util_class');
// NATIVE IMPORTS

const { version, dependencies } = require('../package.json');
const Routes = require('./routers');
const App = Express();

// Inicializacion de variables y seteamos el idioma por defecto
App.use((_req, _res, _next) => {
  try {
    _req.ND = {};
    _req.WHOIS = 'req';
    _res.WHOIS = 'res';
    return _next();
  } catch (_error) {
    new LogUtilClass('INICIO,index.js').error(_error, false);
    return _next();
  }
});

App.use(MorganMiddleware);
App.use(Cors());
App.use(Express.urlencoded({ extended: false }));
App.use(Express.json({ limit: '10mb' }));
App.use(UserAgent.express());

// Validar SERVIDOR ACTIVO
App.get('/', async (_req, _res) => {
  return _res.status(200).send(`its Works!. ${process.env.CC_CORE_NAME} (${version})`);
});

//  Obtener informacion del Proyecto
App.get('/info/:id', async (_req, _res, _next) => {
  if (_req.params.id == process.env.CC_APIKEY) return _res.status(200).send({ project: process.env.CC_CORE_NAME, version: version, pkg: dependencies });
  return _next();
});

// Seteamos rutas Rutas
Routes(App);

// Error (GENERAL NO IDENTIFICADO 500)
App.use(async (_err, _req, _res, _next) => {
  const ND_RESPONSE = new ResponseUtilClass(_req, _res);
  try {
    // JSON Mal Formado
    const NEW_ERROR = _err.status === 400 && 'body' in _err ? new ErrorUtilClass(__filename, 'MSRVE001', _err, 'TL-CUTL-MSRVE-01').server() : new ErrorUtilClass(__filename, 'MSRVE002', _err).server();
    return ND_RESPONSE.sendError(NEW_ERROR);
  } catch (_error) {
    return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'MSRVE003', _error).server() : _error);
  }
});

// Capture All 404 errors
App.use(async (_req, _res, _next) => {
  const ND_RESPONSE = new ResponseUtilClass(_req, _res);
  try {
    let NEW_ERROR = null;
    if (_req.originalUrl == '/favicon.ico') {
      NEW_ERROR = new ErrorUtilClass(__filename, 'MNTFE001', null, 'TL-CUTL-MNTFE-1').frontend();
    } else {
      NEW_ERROR = new ErrorUtilClass(__filename, 'MNTFE001', { name: 'error-404', url: _req.headers.host + _req.originalUrl, method: _req.method }, 'TL-CUTL-MNTFE-1').server(404);
    }
    return ND_RESPONSE.sendError(NEW_ERROR);
  } catch (_error) {
    return ND_RESPONSE.sendError(!_error?.errorType ? new ErrorUtilClass(__filename, 'MNTFE002', _error).server() : _error);
  }
});

// Exportar module
module.exports = App;
