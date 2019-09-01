import { Router } from "express";
import User from "./app/models/User";

const routes = new Router();

routes.get("/", async (req, res) => {
  const user = await User.create({
    name: "Lucas Queiroz",
    email: "lucasmedeirosq@gmail.com",
    password_hash: "lucas1223"
  });
  return res.json(user);
});

export default routes;
