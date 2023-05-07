const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.adc82879541f16c21f3690d6793a2f85&q='+address+'&format=json&limit=1'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('unable to connect gccode', undefined)
        } else if (body.error) {
            callback('invalid request', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                name : body[0].display_name
            })
            console.log('lot' +body[0].lat+'lan'+body[0].lon)
            console.log(body[0].display_name)
        }
    })
}

module.exports = geocode