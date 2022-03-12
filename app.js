const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
require("./database/connection");

const indexRouter = require("./routes/index.routes");
const authRouter = require("./routes/auth.routes");
const articleRouter = require("./routes/article.routes");
const commentRouter = require("./routes/comment.routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: "12345",
    key: "blogger_seed",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", articleRouter);
app.use("/", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  return res.status(404).render("404", {
    msg: null,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
