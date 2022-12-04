const ParameterService = require("../services/parameters");
const express = require("express");

const ParametersRouter = (app) => {
  const service = new ParameterService();
  const router = express.Router();  
  app.use("/parameter", router);

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const parameter = await service.getOne(id);
    if (!parameter) {
      res.send({ status: 404, message: "Not found" });
    } else {
      res.send(parameter);
    }
  });

  router.post("/getParameters", async (req, res) => {
    let body = req.body;

    const parameters = await service.getAll(body);
    res.send(parameters);
  });

  router.post("/", async (req, res) => {
    let body = req.body;

    const createdParameter = await service.create(body);
    res.send(createdParameter);
  });

  router.put("/:id", async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    const updatedParameter = await service.update(body, id);

    res.send(updatedParameter);
  });

  router.delete("/:id", async (req, res) => {
    let id = req.params.id;

    const deletedParameter = await service.delete(id);

    res.send(deletedParameter);
  });
};

module.exports = ParametersRouter;
