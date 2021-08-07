const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const forecast = require('./utils/forecast');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

//this is just to send back a text, html or json
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>');
// })

// to render a hbs html page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ajesh Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ajesh Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ajesh Kumar'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Ajesh Kumar'
    })
})


// app.get('/help', (req, res) => {
//     // res.send('Help Page');
//     res.send(
//         [
//             {
//                 name: 'Ajesh',
//                 age: 32
//             },
//             {
//                 name: 'Arjun',
//                 age: 26
//             }
//         ]
//     );
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>');
// })

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({ error: "Please provide a valid address" })
    }
    forecast(address, (error, forecastData) => {
        if (error) {
            return res.send({ error: "Please provide a valid address" })
        }
        res.send({ forecast: forecastData })
    })

    // res.send('Weather Page');
    // res.send({
    //     forecast: 'I will Rain',
    //     location: 'Jinnuru  '
    // });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Ajesh Kumar'
    })
})

app.listen(3000, () => {
    console.log("server is now listening to port 3000")
})