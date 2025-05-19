import jwt from "jsonwebtoken";
const Token = async (body, res) => {
  // eslint-disable-next-line no-undef
  const token = jwt.sign(body, process.env.Eslam_TOKEN, { expiresIn: "30m" });
  res.cookie("token", token, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production", // لو في سيرفر حقيقي
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
  });
  return token;
};
export default Token;
