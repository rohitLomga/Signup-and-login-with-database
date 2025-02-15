require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { userSignUp } = require("./UserModel");
const { Login } = require("./Login");

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow React frontend
app.use(express.json());

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const result = await userSignUp(username, email, password);

  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(500).json({ message: result.message });
  }
});

// Log in api
app.post("api/login", async(req, res) => {

  const [username, password] = req.body;

  if(!username || !password){
    return res.status(400).json({message: "Both fields are required"})
  }

  try{
    const user = await Login(username, password);

    if(!user){
      return res.status(400).json({error: 'Username and password do not match'});
    }
  
    // JWT TOKEN
    const token = jwt.sign(
      {username: user.username, password: user.password}, process.env.JWT_CODE,
      {expires: '1h'}
    );

    res.status(200).json({ message: 'Login successful', token });  // Send token in response

  }

  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
  }
  
})

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
