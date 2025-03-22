const isuserauth = (req, res, next) => {
  const token = "xyz";
  const isauth = token === "xyz";
  if (!isauth) {
    res.status(401).send("unautharized");
  } else {
    next();
  }
};
const isadminauth = (req, res, next) => {
  const token = "xyz";
  const isauth = token === "xyz";
  if (!isauth) {
    res.status(401).send("unautharized");
  } else {
    next();
  }
};
module.exports = { isuserauth, isadminauth };
