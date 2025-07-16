const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// GET: Login Page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// GET: Signup Page
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

// POST: Signup
router.post("/signup", async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.render("signup", { error: "Passwords do not match." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("signup", { error: "Something went wrong." });
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  const { identifier, password, role } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      role: role,
    });

    if (!user) {
      return res.render("login", { error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Incorrect password." });
    }

    // Successful login → render dashboard/sections with username
    res.render("sections", { user: user.username });
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Server error." });
  }
});

// SECTION ROUTES (Render EJS Views with navbar)
router.get("/it", (req, res) => {
  res.render("it", { user: "IT Section" });
});

router.get("/robotics", (req, res) => {
  res.render("robotics");
});

router.get("/mou", (req, res) => {
  res.render("mou", { user: "MOU Section" });
});

router.get("/bdo", (req, res) => {
  res.render("bdo", { user: "BDO Section" });
});

router.get('/mou', (req, res) => {
  res.render('mou');  // make sure this matches the filename exactly: mou.ejs
});

router.get("/bdo", (req, res) => {
  res.render("bdo"); // ✅ This matches views/bdo.ejs
});

// Logout route (optional)
router.get("/logout", (req, res) => {
  // Clear session/cookie if implemented
  res.redirect("/login");
});

module.exports = router;
