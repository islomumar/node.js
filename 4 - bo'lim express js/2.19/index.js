const express = require("express");
require("dotenv").config();
const { auth } = require("./logger");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const books = require("./routes/books");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");
app.use("/api/books", books);

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("logger ishlaypti...");
}

app.use(auth);
app.use(helmet());

app.get("/", (req, res) => {
    res.render("index", { title: "my express app", greeting: "Hello" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port}portni eshitishni boshladim...`);
});