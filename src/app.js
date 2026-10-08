const express = require("express");  //requiring express application
const connectDB = require('./db/connection');  //requiring the database connection function

const Mens = require('./models/mens');  //requiring the Mens model for database operations

const app = express();  //creating an instance of express application
app.use(express.json());

const PORT = process.env.PORT || 3000;  //setting the port for the server

app.get("/", (req, res) => {
  res.send("Hello, World!");  //sending a response to the client
});

app.post("/mens", async (req, res) => {
  try {
    const mensData = new Mens(req.body);
    await mensData.save();
    res.status(201).json(mensData);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "An athlete with this ranking already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

app.get("/mens", async (req, res) => {
  try {
    const mens = await Mens.find();
    res.json(mens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/mens/:id", async (req, res) => {
  try {
    const mens = await Mens.findById(req.params.id);
    if (!mens) {
      return res.status(404).json({ error: "Athlete not found" });
    }
    res.json(mens);
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});

app.patch("/mens/:id", async (req, res) => {
  try {
    const mens = await Mens.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true
    });
    if (!mens) {
      return res.status(404).json({ error: "Athlete not found" });
    }
    res.json(mens);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "An athlete with this ranking already exists" });
    }
    const status = error.name === "CastError" || error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});

app.delete("/mens/:id", async (req, res) => {
  try {
    const mens = await Mens.findByIdAndDelete(req.params.id);
    if (!mens) {
      return res.status(404).json({ error: "Athlete not found" });
    }
    res.json({ message: "Athlete deleted", mens });
  } catch (error) {
    const status = error.name === "CastError" ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
});

//start the server only after the database is connected
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);  //logging the server status
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });