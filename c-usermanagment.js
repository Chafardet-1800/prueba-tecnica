// @ts-nocheck
'use strict';

try {
  // Info Del Core
  process.env.ND_NODE_ENV = process.env.ND_AUTH_NODE_ENV;
  process.env.ND_APIKEY = process.env.ND_AUTH_APIKEY;
  //   process.env.CC_IS_CORE = true; // Tipo Core
  process.env.ND_CORE_NAME = process.env.ND_AUTH_CORE_NAME;
  process.env.ND_CORE_PORT = process.env.PORT;
  // DataBase
  process.env.ND_DB_HOST = process.env.ND_AUTH_DB_HOST;
  process.env.ND_DB_PORT = process.env.ND_AUTH_DB_PORT;
  process.env.ND_DB_NAME = process.env.ND_AUTH_DB_NAME;
  process.env.ND_DB_USER = process.env.ND_AUTH_DB_USER;
  process.env.ND_DB_PASS = process.env.ND_AUTH_DB_PASS;

  process.env.ND_APIKEY = process.env.ND_CAUTH_APIKEY;

  // Iniciamos nuestra APP
  const App = require('./app');
  const LogUtilClass = require('@nerd/cmm/utils/log.util_class');
  const { CMM_SERVER } = require('@nerd/cmm/configs');

  const CC_SEQUELIZE = CMM_SERVER.DatabasePg;

  // Variable de Entorno para Comprobar si esta tomand el ENV del Servidor
  new LogUtilClass('AMBIENTE').info(`Runing in ${process.env.CC_NODE_ENV}`);

  // Conexion con Base de Datos
  CC_SEQUELIZE.authenticate()
    .then(() => {
      new LogUtilClass('Conect Sequelize DB').info(`Database Connect, User: ${process.env.ND_DB_USER} and Database: ${process.env.ND_DB_NAME}`);
      // Conexion con Express JS
      App.listen(process.env.ND_CORE_PORT, () => {
        new LogUtilClass('Conect Express').info(`Servidor Express Runing: ${process.env.ND_CORE_NAME}, Port: ${process.env.ND_CORE_PORT}`);
      }).on('error', (_error) => {
        new LogUtilClass('CATCH Express Connect').error(_error);
      });
    })
    .catch((_error) => {
      new LogUtilClass('CATCH Sequelize Connect').error(_error);
    });
} catch (_error) {
  console.error('Error trycatch index\n\n', _error);
}
