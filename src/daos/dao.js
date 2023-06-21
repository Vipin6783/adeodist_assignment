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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  };

  create = async (data, options = {}) => {
    try {
      return await this.model.create(data, { raw: true, ...options });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  restore = async (data, options = {}) => {
    try {
      return await this.model.restore(data, { raw: true, ...options });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  destroy = async (data, options = {}) => {
    try {
      return await this.model.destroy(data, { raw: true, ...options });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
