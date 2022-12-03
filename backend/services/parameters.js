const { Premio: parameterModel, sequelize } = require("../models");

class parameterService {
  async getOne(id) {
    const parameter = await parameterModel.findOne({
      where: { id, state: 1 },
    });
    return parameter;
  }

  async getAll(where) {
    const parameters = await parameterModel.findAll({
      where: { ...where, state: 1 },
    });
    return parameters;
  }

  async create(data) {
    const t = await sequelize.transaction();
    try {
      const createdParameter = await parameterModel.create(data, { transaction: t });
      await t.commit();
      return createdParameter;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't create",
      };
    }
  }

  async update(data, parameterId) {
    const t = await sequelize.transaction();
    try {
      await parameterModel.update(data, {
        where: { id: parameterId },
        transaction: t,
      });
      await t.commit();
      const updatedParameter = await parameterModel.findByPk(parameterId);
      return updatedParameter;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't update",
      };
    }
  }

  async delete(parameterId) {
    const t = await sequelize.transaction();
    const parameter = await this.getOne(parameterId);
    if (!parameter) {
      return {
        status: 400,
        message: "Parameter Not Found",
      };
    }
    try {
      await parameterModel.update(
        { state: -1 },
        {
          where: { id: parameterId },
          transaction: t,
        }
      );
      await t.commit();
      return parameterId;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't delete",
      };
    }
  }
}

module.exports = parameterService;
