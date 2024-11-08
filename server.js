const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String
});

// Create User Model
const User = mongoose.model('User', userSchema);

// POST route to handle form submission
app.post('/signup', (req, res) => {
  const { name, email, username, password } = req.body;

  const newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  });

  newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
