const axios = require("axios");
const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const port = process.env.PORT || 7000;
// const API_URL = "http://localhost:4567";
const API_URL = "https://cs280-younote-api.herokuapp.com";

nunjucks.configure("views", {
  express: app,
});

app.use(express.static("assets"));

app.get("/", (_req, res) => {
  res.render("index.njk", null);
});

app.get("/dashboard", async (req, res) => {
  const username = req.query.uname;
  const data = {
    nickname: username,
  };

  try {
    let response = await axios.get(`${API_URL}/api/notes?author=${username}`);
    data.notes = response.data.data;
  } catch (error) {
    console.log(error);
    data.notes = [];
  }

  res.render("dashboard.njk", data);
});


app.listen(port, () => {
  console.log(`YouNote App running at http://localhost:${port}/`);
});
