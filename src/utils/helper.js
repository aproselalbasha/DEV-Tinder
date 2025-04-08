// const dataverify = (req) => {
//   const { firstName, passWord } = req.body;
//   if (firstName.length === 0) {
//     throw new Error("user name not empty");
//   }
// };
const profileeditvalidation = (req) => {
  const accecpteddata = ["firstName", "lastName", "emailId", "age", "gender"];
  const userdata = req.body;
  const isaccecpted = Object.keys(userdata).every((key) =>
    accecpteddata.includes(key)
  );
  return isaccecpted;
};
module.exports = profileeditvalidation;
