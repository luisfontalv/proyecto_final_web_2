const { Equipo: teamModel, sequelize } = require("../models");

class teamService {
  async getOne(id) {
    const team = await teamModel.findOne({
      where: { id, estado: 1 },
    });
    return team;
  }

  async getAll(where) {
    const teams = await teamModel.findAll({
      where: { ...where, estado: 1 },
    });
    return teams;
  }

  async create(data) {
    const t = await sequelize.transaction();
    try {
      const createdTeam = await teamModel.create(data, { transaction: t });
      await t.commit();
      return createdTeam;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't create",
      };
    }
  }

  async update(data, teamId) {
    const t = await sequelize.transaction();
    try {
      await teamModel.update(data, {
        where: { id: teamId },
        transaction: t,
      });
      await t.commit();
      const updatedTeam = await teamModel.findByPk(teamId);
      return updatedTeam;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't update",
      };
    }
  }

  async delete(teamId) {
    const t = await sequelize.transaction();
    const team = await this.getOne(teamId);
    if (!team) {
      return {
        status: 400,
        message: "Team Not Found",
      };
    }
    try {
      await teamModel.update(
        { estado: -1 },
        {
          where: { id: teamId },
          transaction: t,
        }
      );
      await t.commit();
      return teamId;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't delete",
      };
    }
  }
}

module.exports = teamService;
