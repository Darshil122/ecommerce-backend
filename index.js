const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// import { bodyparser } from "body-parser";

// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const filePath = path.join(__dirname, "users.json");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

app.post("/login", async (req, res) => {
  console.log("req body", req.body);
  const { name, email, password, action } = req.body;
  if (action === "Sign Up") {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password, action });
    res.status(201).json({ message: "User created" });
  }
  if (action === "Login") {
    // const user = await User.findOne({ email });

    if (email === "jaydev@gmail.com" || password === "jk@123") {
      return res.status(200).json({ message: "Login successfully" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
    // const isMatch = await compare();
    // if (!password)
    //   return res.status(400).json({ message: "Invalid password" });
  }
});
app.listen(5000, ()=>console.log("server start"));