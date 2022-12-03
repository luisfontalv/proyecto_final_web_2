const { Client: clientModel, sequelize } = require("../models/");

class clientService {
  async getOne(id) {
    const client = await clientModel.findOne({
      where: { id, state: 1 },
    });
    return client;
  }

  async getAll(where) {
    const clients = await clientModel.findAll({
      where: { ...where, state: 1 },
    });
    return clients;
  }

  async create(data) {
    const t = await sequelize.transaction();
    try {
      const createdClient = await clientModel.create(data, { transaction: t });
      await t.commit();
      return createdClient;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't create",
      };
    }
  }

  async update(data, clientId) {
    const t = await sequelize.transaction();
    try {
      await clientModel.update(data, {
        where: { id: clientId },
        transaction: t,
      });
      await t.commit();
      const updatedClient = await clientModel.findByPk(clientId);
      return updatedClient;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't update",
      };
    }
  }

  async delete(clientId) {
    const t = await sequelize.transaction();
    const client = await this.getOne(clientId);
    if (!client) {
      return {
        status: 400,
        message: "User Not Found",
      };
    }
    try {
      await clientModel.update(
        { state: -1 },
        {
          where: { id: clientId },
          transaction: t,
        }
      );
      await t.commit();
      return clientId;
    } catch (e) {
      await t.rollback();
      return {
        status: 400,
        message: "Couldn't delete",
      };
    }
  }
}

module.exports = clientService;
