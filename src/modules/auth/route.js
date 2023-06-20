import express from "express";
import userDao from "../../daos/userDao"
const authRouter = express.Router();

authRouter.get("/auth", async function (req, res, next) {
  const result = await userDao.findOne()
  console.log('result ========================= ', result);
  return res.status(200).json(result);
});

export default authRouter
