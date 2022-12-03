const {
  Deportista: playerModel,
  Premio: awardModel,
  Equipo: teamModel,
  sequelize,
} = require("../models");

class playerService {
  async getOne(id) {
    const player = await playerModel.findOne({
      where: { id, estado: 1 },
      include: [
        {
          model: awardModel,
          as: "premios",
          where: { estado: 1 },
          required: false,
        },
        {
          model: teamModel,
          as: "equipo",
          where: { estado: 1 },
          required: false,
        },
      ],
    });
    return player;
  }

  async getAll(where) {
    const players = await playerModel.findAll({
      where: { ...where, estado: 1 },
      include: [
        {
          model: awardModel,
          as: "premios",
          where: { estado: 1 },
          required: false,
        },
        {
          model: teamModel,
          as: "equipo",
          where: { estado: 1 },
          required: false,
        },
      ],
    });
    return players;
  }

  async create(data) {
    const t = await sequelize.transaction();
    try {
      const createdPlayer = await playerModel.create(data, { transaction: t });
      await t.commit();
      return createdPlayer;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't create",
      };
    }
  }

  async update(data, playerId) {
    const t = await sequelize.transaction();
    try {
      await playerModel.update(data, {
        where: { id: playerId },
        transaction: t,
      });
      await t.commit();
      const updatedPlayer = await playerModel.findByPk(playerId);
      return updatedPlayer;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't update",
      };
    }
  }

  async delete(playerId) {
    const t = await sequelize.transaction();
    const player = await this.getOne(playerId);
    if (!player) {
      return {
        status: 400,
        message: "Player Not Found",
      };
    }
    try {
      await playerModel.update(
        { estado: -1 },
        {
          where: { id: playerId },
          transaction: t,
        }
      );
      await t.commit();
      return playerId;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't delete",
      };
    }
  }
}

module.exports = playerService;
