const { Premio: awardModel, sequelize } = require("../models");

class awardService {
  async getOne(id) {
    const award = await awardModel.findOne({
      where: { id, estado: 1 },
    });
    return award;
  }

  async getAll(where) {
    const awards = await awardModel.findAll({
      where: { ...where, estado: 1 },
    });
    return awards;
  }

  async create(data) {
    const t = await sequelize.transaction();
    try {
      const createdAward = await awardModel.create(data, { transaction: t });
      await t.commit();
      return createdAward;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't create",
      };
    }
  }

  async update(data, awardId) {
    const t = await sequelize.transaction();
    try {
      await awardModel.update(data, {
        where: { id: awardId },
        transaction: t,
      });
      await t.commit();
      const updatedAward = await awardModel.findByPk(awardId);
      return updatedAward;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't update",
      };
    }
  }

  async delete(awardId) {
    const t = await sequelize.transaction();
    const award = await this.getOne(awardId);
    if (!award) {
      return {
        status: 400,
        message: "Award Not Found",
      };
    }
    try {
      await awardModel.update(
        { estado: -1 },
        {
          where: { id: awardId },
          transaction: t,
        }
      );
      await t.commit();
      return awardId;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't delete",
      };
    }
  }
}

module.exports = awardService;
