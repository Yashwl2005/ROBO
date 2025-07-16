// app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./db");          // ✅ Add this
const authRoutes = require("./routes/auth"); // ✅ And this

const app = express();
const PORT = 3000;

// Connect to MongoDB Atlas
connectDB(); // ✅ Connect DB

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes); // ✅ Use routes

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
