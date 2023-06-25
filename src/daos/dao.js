import logger from "../utils/logger";
export default class Dao {
  constructor(model) {
    this.model = model;
  }

  findOne = async (criteria = {}, options = {}) => {
    try {
      return await this.model.findOne({
        where: criteria,
        raw: true,
        ...options,
      });
    } catch (err) {
      logger.log(`Error found while calling findOne function >>> ${err}`);
      throw err;
    }
  };

  findAll = async (criteria = {}, options = {}) => {
    try {
      return await this.model.findAll({
        where: criteria,
        raw: true,
        ...options,
      });
    } catch (err) {
      logger.log(`Error found while calling findAll function >>> ${err}`);
      throw err;
    }
  };

  update = async (data, criteria = {}, options = {}) => {
    try {
      return await this.model.update(data, {
        where: criteria,
        raw: true,
        ...options,
      });
    } catch (err) {
      logger.log(`Error found while calling update function >>> ${err}`);
    }
  };

  create = async (data, options = {}) => {
    try {
      return await this.model.create(data, { raw: true, ...options });
    } catch (err) {
      logger.log(`Error found while calling create function >>> ${err}`);
      throw err;
    }
  };

  restore = async (data, options = {}) => {
    try {
      return await this.model.restore(data, { raw: true, ...options });
    } catch (err) {
      logger.log(`Error found while calling restore function >>> ${err}`);
      throw err;
    }
  };

  destroy = async (criteria = {}, options = {}) => {
    try {
      return await this.model.destroy({
        where: criteria,
        raw: true,
        ...options,
      });
    } catch (err) {
      logger.log(`Error found while calling destroy function >>> ${err}`);
      throw err;
    }
  };
}
