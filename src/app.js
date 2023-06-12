const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define path express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// set up handle bars and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// set up static directory
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Riya Mansuri'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Riya Mansuri - about'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Happy to Help',
        title: 'help page',
        name: 'Riya Mansuri - help',
        
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        helpText: '404 page',
        title: 'help page',
        name: 'Riya Mansuri',
        errorMessage: 'Help - Page Not Found'
    });
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return (res.send({
            error: 'please provide search term'
        }))
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/weather', (req,res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({
            error: 'please provide address'
        })
    }
    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error && !forecastData) {
                return res.send({
                    error
                });
            }
            res.send({
                'forecast': forecastData,
                'location': location,
                'address': req.query.address
            });
        });
    });
})

app.get('/*', (req, res) => {
    res.render('404', {
        helpText: '404 page',
        title: 'help page',
        name: 'Riya Mansuri',
        errorMessage: 'Page Not Found'
    });
})

app.get('', (req,res) => {
    res.send('Hello.....');
})

app.get('/help', (req,res) => {
    res.send('Help Page');
})

app.get('/about', (req,res) => {
    res.send('<h1><i>About Page</i><h1>');
})





app.listen(3000, () => {
    console.log('server is up');
});
