const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/gecode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sairam Dammalapati'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sairam Dammalapati'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sairam Dammalapati'
    })
})

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             errorMessage: 'address is required'
//         })
//     }
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia',
//         address: req.query.address
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'address is required'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude,name } = {}) => {
        if (error) {
            return res.send({
               error
            })
        }
        weather(latitude, longitude, (error, { type, temperature, feelslike,humidity} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                type,   
                temperature,
                feelslike,
                name,
                humidity,   
                title: 'it is like '+type + '.current temperature is:' + temperature + ' but feels like:' + feelslike+' and humidity is:'+humidity
            })

        })
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sairam Dammalapati',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sairam Dammalapati',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+port)
})