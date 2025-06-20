const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

app.use(express.json());
app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/e-commerce")
//   .then(() => console.log("Mongo connected"))
//   .catch((err) => console.log(err));

app.post("/login", async (req, res) => {
  console.log("req body", req.body);
  const { name, email, password, action } = req.body;
  if (action === "Sign Up") {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { name, email, password };
    users.push(newUser);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // await User.create({ name, email, password, action });
    // res.status(201).json({ message: "User created" });

    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to save user" });
    }
  }
  if (action === "Login") {
    // const user = await User.findOne({ email });
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // const isMatch = await compare();
    // if (!password)
    //   return res.status(400).json({ message: "Invalid password" });
  }
});
app.listen(5000, ()=>console.log("server start"));