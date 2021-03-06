const { jsonFile } = require("../endpoints.json");

const {
  fetchTopics,
  fetchArticles,
  fetchUsers,
  patchArticle,
  fetchCommentsByArticleId,
  fetchArticlesWithCommentCount,
  insertComment,
  getData,
  deleteComment,
  fetchUser,
  updateVoteByCommentId,
  insertArticle,
} = require("../model/app.model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticles(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  patchArticle(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

//changes made for incorporate task 11
exports.getArticles = (req, res, next) => {
  const reqQuery = req.query;
  const { sort_by, order, topic, limit, p } = req.query;

  fetchArticlesWithCommentCount(sort_by, order, topic, limit, p, reqQuery)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const mybody = req.body;

  insertComment(article_id, username, body, mybody)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllapi = (req, res, next) => {
  const data = getData();

  res.status(200).send({ data });
};

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateVoteByCommentId(comment_id, inc_votes, req.body)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {
  insertArticle(req.body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
