const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=deafab31c0b9e97c2fd0c692e7eabf4a&query=" + lat + "," + long + "&units=f";
    request({url, json: true}, (error,{ body } = {}) => {
        if (error) {
            callback('unable to connect the weatherstack');
        } else if (body.error) {
            callback('unable to find location');
        } else {
            const currentData = body.current;
            callback('undefined', currentData.weather_descriptions[0]+'. It is currently '+currentData.temperature+' degree out.It feels like '+currentData.feelslike+' degree out');
        }
    });
}

module.exports = forecast;