const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

app.use(express.json());

app.post("/login", async (req, res) => {
  const { name, email, password, action } = req.body;

  // Read the users.json file
  let users = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to read user data" });
  }

  if (action === "Sign Up") {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);

    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to save user" });
    }
  }

  if (action === "Login") {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  }

  return res.status(400).json({ message: "Invalid action" });
});
