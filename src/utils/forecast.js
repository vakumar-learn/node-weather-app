const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f98f0de0fa21cce447d9df5c688adaa2&query=' + address;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body);
            callback(undefined, `In ${body.location.name} the current temperature is ${body.current.temperature}. Butt it feels like  ${body.current.feelslike}`)
        }
    })
}

module.exports = forecast