const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // it conver new user data to JSON string

const port = process.env.PORT || 5000;

const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alicejohnson@example.com' }
];

app.get('/', (req, res) => {
    res.send('Welcome to the users server home page');
});


app.get('/users', (req ,res) => {
    res.send(users);
})

app.post('/users', (req, res) => {
    console.log("Post API hitting!");

    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});