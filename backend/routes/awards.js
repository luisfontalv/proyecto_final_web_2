const AwardService = require("../services/awards");
const express = require("express");

const AwardsRouter = (app) => {
  const service = new AwardService();
  const router = express.Router();
  app.use("/award", router);

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const award = await service.getOne(id);
    if (!award) {
      res.send({ status: 404, message: "Not found" });
    }
    res.send(award);
  });

  router.post("/getAwards", async (req, res) => {
    let body = req.body;

    const awards = await service.getAll(body);
    res.send(awards);
  });

  router.post("/", async (req, res) => {
    let body = req.body;

    const createdAward = await service.create(body);
    res.send(createdAward);
  });

  router.put("/:id", async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    const updatedAward = await service.update(body, id);

    res.send(updatedAward);
  });

  router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    const deletedAward = await service.delete(id);

    res.send(deletedAward);
  });
};

module.exports = AwardsRouter;
