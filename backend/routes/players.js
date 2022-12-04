const PlayerService = require("../services/players");
const express = require("express");

const PlayersRouter = (app) => {
  const service = new PlayerService();
  const router = express.Router();
  app.use("/player", router);

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const player = await service.getOne(id);
    if (!player) {
      res.send({ status: 404, message: "Not found" });
    } else {
      res.send(player);
    }
  });

  router.post("/getPlayers", async (req, res) => {
    let body = req.body;

    const players = await service.getAll(body);
    res.send(players);
  });

  router.post("/", async (req, res) => {
    let body = req.body;

    const createdPlayer = await service.create(body);
    res.send(createdPlayer);
  });

  router.put("/:id", async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    const updatedPlayer = await service.update(body, id);

    res.send(updatedPlayer);
  });

  router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    const deletedPlayer = await service.delete(id);

    res.send(deletedPlayer);
  });
};

module.exports = PlayersRouter;
