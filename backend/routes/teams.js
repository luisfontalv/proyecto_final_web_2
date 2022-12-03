const TeamService = require("../services/teams");
const express = require("express");

const TeamsRouter = (app) => {
  const service = new TeamService();
  const router = express.router();
  app.use("/team", router);

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const team = await service.getOne(id);
    if (!team) {
      res.send({ status: 404, message: "Not found" });
    }
    res.send(team);
  });

  router.post("/getTeams", async (req, res) => {
    let body = req.body;

    const teams = await service.getAll(body);
    res.send(teams);
  });

  router.post("/", async (req, res) => {
    let body = req.body;

    const createdTeam = await service.create(body);
    res.send(createdTeam);
  });

  router.put("/:id", async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    const updatedTeam = await service.update(body, id);

    res.send(updatedTeam);
  });

  router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    const deletedTeam = await service.delete(id);

    res.send(deletedTeam);
  });
};

module.exports = TeamsRouter;
