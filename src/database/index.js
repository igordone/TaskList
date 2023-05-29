import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/user';
import Task from '../app/models/task';
import Request from '../app/models/request';

const models = [User, Task, Request];
import dotenv from 'dotenv';

dotenv.config();

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
