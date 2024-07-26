const express = require('express');
const bodyParser = require('body-parser');  //Middleware to parse incoming request bodies 
const jwt = require('jsonwebtoken');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3500;

app.use(cors());   //enables cors
app.use(bodyParser.json());

const users = [];   //array for storing user information
const pets = [];    //array for storing pet information
let petId = 1;

// Signup endpoint
app.post('/api/users', (req, res) => {
  const { firstName, lastName, email, password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const user = { firstName, lastName, email, password};
  users.push(user);

  const token = jwt.sign({ email }, 'your_jwt_secret');
  res.status(201).json({ token, user });
});

// Login endpoint
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  const token = jwt.sign({ email: user.email }, 'your_jwt_secret');
  res.status(200).json({ token, user });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.userEmail = decoded.email;
    next();
  });
};

// Create pet endpoint
app.post('/api/pets', verifyToken, (req, res) => {
  const { name, type, breed, price } = req.body;

  if (!name || !type || !breed || !price) {
    return res.status(400).send('All fields are required');
  }

  const newPet = { id: petId++, name, type, breed, price };
  pets.push(newPet);
  res.status(201).json(newPet);
});

// Get all pets endpoint
app.get('/api/pets', verifyToken, (req, res) => {
  res.status(200).json(pets);
});

// Update pet endpoint
app.put('/api/pets/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, type, breed, price } = req.body;

  const petIndex = pets.findIndex((pet) => pet.id === parseInt(id));
  if (petIndex === -1) {
    return res.status(404).send('Pet not found');
  }

  pets[petIndex] = { ...pets[petIndex], name, type, breed, price };
  res.status(200).json(pets[petIndex]);
});

// Delete pet endpoint
app.delete('/api/pets/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const petIndex = pets.findIndex((pet) => pet.id === parseInt(id));
  if (petIndex === -1) {
    return res.status(404).send('Pet not found');
  }

  const deletedPet = pets.splice(petIndex, 1);
  res.status(200).json(deletedPet[0]);
});

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
