const express = require("express");
const bodyParser = require("body-parser");
const ClientService = require("./services/client");
const cors = require("cors");

const clientService = new ClientService();

require("./models/");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World Diego!");
});

app.get("/clients/:id", async (req, res) => {
  const id = req.params.id;
  const client = await clientService.getOne(id);
  if (!client) {
    res.send({ status: 404, message: "Not found" });
  }
  res.send(client);
});

app.post("/clients/getClients", async (req, res) => {
  let body = req.body;

  const clients = await clientService.getAll(body);
  res.send(clients);
});

app.post("/clients/", async (req, res) => {
  let body = req.body;

  const createdClient = await clientService.create(body);
  res.send(createdClient);
});

app.put("/clients/:id", async (req, res) => {
  let body = req.body;
  let id = req.params.id;

  const updatedClient = await clientService.update(body, id);

  res.send(updatedClient);
});

app.delete("/clients/:id", async (req, res) => {
  let id = req.params.id;

  const deletedClient = await clientService.delete(id);

  res.send(deletedClient);
});

app.post("/parameters", (req, res) => {
  let body = req.body;
  res.send(body);
});

module.exports = app;
