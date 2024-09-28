let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'public')));

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/all", (req, res) => {
  res.json(projectData);
});

app.post("/addData", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.json({ message: "Data added successfully", projectData });
});
