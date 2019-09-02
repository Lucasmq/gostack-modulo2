import User from "../models/User";

class UserController {
  async store(req, res) {
    // Essa verificação existe pois em migrations foi setado como unique
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      // Verifico se o email não existe ja para outro usuario
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }
    // verifico se foi informado um oldPassword e verifico se é do usuario
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: "Password does not match" });
    }
    // se tudo deu certo, atualiza o user
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();
