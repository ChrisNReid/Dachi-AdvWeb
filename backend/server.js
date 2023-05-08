const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRouter = require("./auth");

const supabaseUrl = "https://ppayoicayizfiezyqdtf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwYXlvaWNheWl6ZmllenlxZHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI0NDU2NzcsImV4cCI6MTk5ODAyMTY3N30.8BhS7mRtSyEZKeQMg9B80A_Tv9PbocQZjCQ0ZU3YisI";
const supabase = createClient(supabaseUrl, supabaseKey);
const JWT_SECRET =
  "TlJ2sQP1bhiEIqYXTFaS/LV/MQTtC9DUX4WLqKwkJ9X3uYGAfJhId7ZLq0HdNyPsmvo831W7/4pZDa1Bw1YCsQ==";

const corsOptions = {
  origin: "http://localhost:3000", // allow requests from this origin
  optionsSuccessStatus: 200, // return 200 instead of 204 for OPTIONS requests
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", authRouter);

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization token is invalid or expired" });
  }
}
app.get("/api/test", verifyToken, (req, res) => {
  res.json({ message: "Authorization successful", user: req.user });
});

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("email here", email);
  console.log(password);
  // email validation
  if (!email || !password) {
    return res.json({ message: "Email and password are required" });
  }
  if (!email.endsWith("@surrey.ac.uk")) {
    return res.json({ message: "Email must end with @surrey.ac.uk" });
  }
  if (password.length < 6) {
    return res.json({ message: "Password must be at least 6 characters long" });
  }
  const user = { email, password };
  try {
    console.log("backend connection made.");
    const {
      data: { user },
    } = await supabase.auth.signUp({ email, password });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    console.log("successful sign up");
    return res
      .status(200)
      .json({ message: "Sign up successful.", user, token });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Email already exists." });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  // Email and password validation
  if (!email || !password) {
    return res.json({ message: "Email and password are required" });
  }
  const user = { email, password };
  try {
    // Attempt to sign in the user with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // Return success message and user data
    console.log("successful sign in");
    return res
      .status(200)
      .json({ message: "Sign In Successful.", user, token });
  } catch (error) {
    console.error(error.message);
    return res.json({ message: "Failed to sign in" });
  }
});
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

process.env.PORT = 8080;
// Start server
app.listen(process.env.PORT, () => {
  console.log(`hii Server started on port ${process.env.PORT}`);
});
