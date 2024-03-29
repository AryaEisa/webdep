const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const ModelClass = require('./model.js');
const Model = new ModelClass();


app.use(cors());
app.use(express.json()); 
app.use(cookieParser()); 

app.get('/', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});

app.get('/venues', async (req, res) => {
  const stores = await Model.getStores();
  res.json(stores);
});
app.get('/login', (req, res) => {

  res.send('This is the login page');
});

app.delete('/venues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Model.deleteVenue(id);
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    console.error('Error deleting venue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/venues', async (req, res) => {
  try {
    const newVenue = req.body;
    await Model.insertVenue(newVenue);
    res.status(201).json({ message: 'Venue added successfully' });
  } catch (error) {
    console.error('Error adding venue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/venues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVenue = req.body;
    await Model.updateVenue(id, updatedVenue);
    res.status(200).json({ message: 'Venue updated successfully' });
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/venues/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Model.getStoresId(id); 
    res.json(venue);
    console.log("Nice!")
    res.status(200);
  } catch (error) {
    console.error('Error retrieving venue:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username: reqUsername, password } = req.body; 
    const { isLoggedIn, isAdmin, username } = await Model.loginUser(reqUsername, password);

    if (isLoggedIn) {
      if (isAdmin) {
        res.cookie('token', 'super-secret-cookie', { httpOnly: true });
        res.status(200).json({ message: 'Admin login successful', isAdmin: true, username }); 
      } else {
        res.cookie('token', 'super-secret-cookie', { httpOnly: true });
        res.status(200).json({ message: 'Login successful', isAdmin: false, username }); 
      }
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal server error');
  }
});


app.post('/register', async(req, res) => {
  try{
      const {username, password} = req.body;
      await Model.createUser(username, password); 
      res.status(200).send('Registration successful'); // Send a success response
  } catch (error){
      console.error('Error registering user', error);
      res.status(500).send('Registration failed'); // Send a failure response
  }
});


app.get('/check-user-status', (req, res) => {
  const { token } = req.cookies;
  if (token === 'super-secret-cookie') {
    res.send('User is logged in!');
  } else {
    res.status(401).send('Unauthorized');
  }
});




const server = async () => {
  await Model.connectDatabase();
  await Model.setupDatabase();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

server();