const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../../database/config.js');
const db = {};

let sequelize;
if (config.use_env_variable) {
  console.log('trying to connect to db')
  sequelize = new Sequelize(process.env[config.use_env_variable], {        
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  console.log('connected to db')
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

if (!config.console_access) {
  const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
  context.keys().map(context).forEach(module => {
    const sequelizeModel = module(sequelize, Sequelize);
    db[sequelizeModel.name] = sequelizeModel;
  })
} else {
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](file);
      db[model.name] = model;
    });
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
