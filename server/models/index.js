import Sequelize from 'sequelize';
import fs from 'fs';
import * as dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const db = {};
const sequelize = new Sequelize(config.url, config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(`./${file}`);
    db[model.name] = model;
  });

Object.keys(db).forEach((key) => {
  const model = db[key];
  if ('associate' in model) model.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
