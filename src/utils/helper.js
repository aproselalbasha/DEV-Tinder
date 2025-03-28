const dataverify = (req) => {
  const { firstName, passWord } = req.body;
  if (firstName.length === 0) {
    throw new Error("user name not empty");
  }
};
module.exports = { dataverify };
