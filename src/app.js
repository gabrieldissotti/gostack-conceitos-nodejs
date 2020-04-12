const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const findRepository = require('./middlewares/findRepository');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const data = request.body;

  const repository = {
    id: uuid(),
    likes: 0,
    ...data
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", findRepository(repositories), (request, response) => {
  const { 
    url,
    title,
    techs
  } = request.body;

  repositories[request.repositoryIndex] = {
    ...request.repository,
    url,
    title,
    techs
  }

  return response.json(repositories[request.repositoryIndex])
});

app.delete("/repositories/:id", findRepository(repositories), (request, response) => {
  repositories.pop(request.repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", findRepository(repositories), (request, response) => {
  repositories[request.repositoryIndex] = {
    ...request.repository,
    likes: request.repository.likes+1
  }

  return response.json(repositories[request.repositoryIndex])
});

module.exports = app;
