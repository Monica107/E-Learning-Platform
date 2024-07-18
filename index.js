const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { UserModel} = require('./models/schema');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

async function connectdb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/elp");
    const x = 3001;
    app.listen(x, function() {
      console.log(`Starting port ${x}...`);
    });
  } catch (err) {
    console.log("DB not connected: " + err);
  }
}
connectdb();

// Login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await UserModel.findOne({ name });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ id: user._id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      if (existingUser.email === email) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        res.status(400).json({ message: 'Username already exists' });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User created successfully', userId: user._id });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});