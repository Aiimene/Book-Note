import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import { name } from "ejs";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  password: '&ç§"',
  database: "Book",
  host: "localhost",
  port: 5432,
});

db.connect();

app.get("/", (req, res) => {
  res.render("log.ejs", { button: "Log In" });
});

app.get("/sign", (req, res) => {
  res.render("sign.ejs", { button: "Sign Up" });
});

let currentUserName = "";

app.post("/acount-log", async (req, res) => {
  try {
    const name = req.body.username.toLowerCase().trim();
    const user_pass = req.body.password;
    const result = await db.query(
      "SELECT  password FROM users WHERE username = $1",
      [name]
    );
    const password = result.rows[0].password;

    if (!password) {
      throw error;
    }
    if (password != user_pass) {
      res.render("log.ejs", {
        button: "Log In Again",
        pass_error: "Password incorrect ",
      });
    } else {
      currentUserName = name;
      res.redirect("/user");
    }
  } catch (error) {
    console.log(error);
    res.render("log.ejs", {
      button: "Log In Again",
      error: "Username not found ",
    });
  }
});

app.post("/acount-sign", async (req, res) => {
  try {
    const name = req.body.username.trim();
    const pass = req.body.password;
    await db.query(
      "INSERT INTO users (username , password) VALUES($1 , $2) RETURNING id ; ",
      [name, pass]
    );
    currentUserName = name;
    res.redirect("/user");
  } catch (error) {
    res.render("sign.ejs", {
      button: "Sign Up Again",
      error: "Username already taken",
    });
  }
});

app.get("/user", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "user", {
      params: {
        name: currentUserName,
      },
    });
    let result = response.data;
    result.forEach(item => {
      item.read_date = new Date(item.read_date);
      item.read_date=item.read_date.toISOString().split('T')[0];
    });
    console.log(result);
    res.render("index.ejs", { items: result, username: currentUserName });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${API_URL}view/${id}`, {
      params: {
        name: currentUserName,
      },
    });
    const result = response.data[0];
    res.render("edit.ejs", { item: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await axios.patch(API_URL + "edit/" + id, req.body, {
      params: {
        name: currentUserName,
      },
    });
    res.redirect("/user");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

app.get("/view/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(API_URL + "view/" + id, {
      params: {
        name: currentUserName,
      },
    });
    const result = response.data[0];
    res.render("view.ejs", { item: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error .");
  }
});
app.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await axios.delete(API_URL + "delete/" + id);
    res.redirect("/user");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/new", (req, res) => {
  res.render("edit.ejs");
});
app.post("/add", async (req, res) => {
  try {
    const body = req.body;
    body.username = currentUserName ;
    console.log(body);
    await axios.post(API_URL + "add", body);

    res.redirect("/user");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Backend server has failed ... ");
  }
});

app.listen(port, () => {
  console.log(`server running from the port ${port}`);
});
