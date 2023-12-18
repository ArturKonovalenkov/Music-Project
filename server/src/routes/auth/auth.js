const express = require("express");
const routerAuth = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../../../db/models");

routerAuth.get("/", (req, res) => {
  console.log({ user: req.session?.user || "" });
  res.json({ user: req.session?.user || "" });
});

routerAuth.post("/register", async (req, res) => {
  const { login, email, password, checkPassword } = req.body;
  try {
    if (!login || !email || !password || !checkPassword) {
      res.json({ err: "введите данные!" });
    } else {
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.json({ err: "Такой пользователь уже существует" });
      } else {
        if (password === checkPassword) {
          const hashPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            login,
            email,
            password: hashPassword,
          });
          if (newUser) {
            const data = newUser.get({ raw: true });
            const { id, login, email } = data;
            req.session.user = { id, login, email };
            req.session.save(() => {
              res.json({
                msg: "Пользователь успешно зарегестрирован",
                login: login,
              });
            });
          }
        } else {
          res.json({ err: "пароли не совпадают" });
        }
      }
    }
  } catch (error) {
    console.error("erer", error);
  }
});

routerAuth.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ err: "введите данные!" });
    } else {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.json({ err: "Такого пользователя не существует" });
      } else {
        const checkPass = await bcrypt.compare(password, user.password);
        if (checkPass) {
          const data = user.get({ raw: true });
          const { id, login, email } = data;
          req.session.user = { id, login, email };
          req.session.save(() => {
            res.json({ msg: "Пользователь успешно авторизован", login: login });
          });
        } else {
          res.json({ err: "неверно веден пароль" });
        }
      }
    }
  } catch (error) {
    console.error("erer", error);
  }
});

routerAuth.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("MusicUserCookie");
  res.json({ login: "" });
});

module.exports = routerAuth;
