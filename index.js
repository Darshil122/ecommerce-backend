const express = require("express");
const cors = require("cors");
const app = express();

const fs = require("fs");
const path = require("path");

// const filePath = path.join(__dirname, "users.json");

app.use(express.json());
app.use(cors());


app.post("/login", async (req, res) => {
  console.log("req body", req.body);
  const { name, email, password, action } = req.body;
  if (action === "Login") {

    if (email === "jaydev@gmail.com" || password === "jk@123") {
      return res.status(200).json({ message: "Login successfully" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  }
});
app.listen(5000, ()=>console.log("server start"));