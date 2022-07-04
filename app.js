const express = require("express");
const app = express();

app.use(express.json());

const {
  getTopics,
  getArticlesByArticleId,
  patchArticleByArticleId,
} = require("./controller/app.controller");

const {
  psqlErrorHandler,
  handleCustomErrors,
  unhandledErrors,
} = require("./errorHandler/errorHandler");

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesByArticleId);
app.patch("/api/articles/:article_id", patchArticleByArticleId);
//error handlers
app.use(psqlErrorHandler);
app.use(handleCustomErrors);
app.use(unhandledErrors);

module.exports = app;