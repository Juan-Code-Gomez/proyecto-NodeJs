const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "your_secret_key";

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).send({ message: "Credenciales invalidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Credenciales invalidas" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.send({ message: "Inicio exitoso", token });
  } catch (error) {
    res.status(500).send({ message: "Error al momento de loguear", error });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return res.status(400).send("Error: Data incompleta.");

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) return res.status(400).send("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).send("Usuario creado exitosamente");
  } catch (error) {
    res.status(500).send({ message: "Error al crear el usuario", error });
  }
};

module.exports = {
  register,
  login
};
