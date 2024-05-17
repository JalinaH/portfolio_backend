const express = require("express");
const app = express(); // create an express app
const port = 5000;

require("dotenv").config();
const Project = require("./Project");
const Blog = require("./Blog");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create a endpoint for creating a project
app.post("/projects", async (req, res) => {
  const project = new Project(req.body);

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create a endpoint for updating a project by id
app.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (req.body.name) {
      project.name = req.body.name;
    }
    if (req.body.description) {
      project.description = req.body.description;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
