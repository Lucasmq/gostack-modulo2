import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

// Para que não coloque em cada rota individualmente
// routes.use(authMiddleware);

routes.put("/users", authMiddleware, UserController.update);

export default routes;
