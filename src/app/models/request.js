import Sequelize, { Model } from 'sequelize';

class Request extends Model {
  static init(sequelize) {
    super.init(
      {
        method: Sequelize.STRING,
        url: Sequelize.STRING,
        body: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Request;
