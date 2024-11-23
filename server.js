const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine for dynamic rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Renders "index.html"
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Perform login authentication (mock or real database)
    if (email === 'admin@example.com' && password === 'password') {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
