exports.invalidPathError = (req, res) => {
  res.status(404).send({ msg: "Invalid Path!" });
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err?.code) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.unhandledErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};
