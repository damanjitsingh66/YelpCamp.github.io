const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');
const campground = require('../models/campground');
// const { send } = require('process');

mongoose.connect('mongodb://localhost:27017/YelpCamp').then((res)=> console.log('connnected')).catch( (err)=>{console.log(err)});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            author:'62b15836a12f2aedc523db86',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
             description:'lorem ipsum dolar sit amet consectur',
            price,
            images:[
                {
                  url: 'https://res.cloudinary.com/dire2weau/image/upload/v1655475008/YelpCamp/cnyw6zikipjse5lceimg.jpg',
                  filename: 'YelpCamp/cnyw6zikipjse5lceimg',
                              },
                {
                  url: 'https://res.cloudinary.com/dire2weau/image/upload/v1655475007/YelpCamp/g6n0eypajmqxsg2natqw.jpg',
                  filename: 'YelpCamp/g6n0eypajmqxsg2natqw',
                         }
              ]
        }) 
        await camp.save();    
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})