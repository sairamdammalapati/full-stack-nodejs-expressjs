const request = require('request')

const weather = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cad85daee0a26ac064f0fd396d52aef1&query='+lat+','+long+'&limit=1'
    request({url,json:true},(error,{body={}}) => {
        if(error) {
            callback('unable to connect network error',undefined)
        } else if (body.error) {
            callback('request failure may be input wrong',undefined)
        } else {
            const current = body.current
            const {temperature,feelslike,humidity} = current
            callback(undefined,{
                type : current.weather_descriptions[0],
                temperature,
                feelslike
            })
            console.log('--------'+humidity)
            console.log(current.weather_descriptions[0]+'it is currently' + temperature +' but fells like' +feelslike)
        }
    })
    }
    module.exports = weather