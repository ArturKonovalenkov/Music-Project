const express = require("express");
require("@babel/register");
const app = express();
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const { PORT } = process.env;

const sessionConfig = {
  name: "MusicUserCookie",
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? "Секретное слово",
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

// импорт роутов
const homeRouter = require("./src/routes/homeRoutes");
const routerAuth = require("./src/routes/auth/auth");

app.use(express.static(path.resolve("public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

//роутеры
app.use("/", homeRouter);
app.use("/auth", routerAuth);

// изменить ковычки на бектики
app.listen(PORT, () => {
  console.log("Сервер крутится на  порту!: ", PORT);
});
