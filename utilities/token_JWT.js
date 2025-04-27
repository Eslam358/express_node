import jwt from "jsonwebtoken";
const Token = async (body) => {
  const token = await jwt.sign(body, process.env.Eslam_TOKEN,  { expiresIn: '30m' } );
  return token;
};
export default Token;
