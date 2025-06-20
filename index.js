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
  let users = [];

  if (action === "Sign Up") {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = { name, email, password };
    users.push(newUser);
    fs.writeFileSync(
      path.join(__dirname, "users.json"),
      JSON.stringify(users, null, 2)
    );
    return res.status(201).json({ message: "User created successfully" });
  }

  if (action === "Login") {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "User logged in successfully" });
    // if (email === "jaydev@gmail.com" || password === "jk@123") {
    //   return res.status(200).json({ message: "Login successfully" });
    // } else {
    //   return res.status(400).json({ message: "User not found" });
    // }
  }
});
app.listen(5000, () => console.log("server start"));
