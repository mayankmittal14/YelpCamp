const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))    //If error
db.once("open", () => {
    console.log("Database Connected")
});

const sample = arr => arr[Math.floor(Math.random()*arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<251; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*1000) + 1000;

        const camp = new Campground({
            author: '60a8b5adae912c4e288092ca',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ea sapiente at, nihil in tempora ad dolores cumque, architecto et quas! Facere, consectetur reprehenderit numquam suscipit ullam sit labore natus!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images : [
                    {
                    url: 'https://res.cloudinary.com/dknx9er46/image/upload/v1622228040/YelpCamp/zpzsegtdzeq52xrgum7v.jpg',
                    filename: 'YelpCamp/zpzsegtdzeq52xrgum7v'
                },
                { 
                    url: 'https://res.cloudinary.com/dknx9er46/image/upload/v1621891782/YelpCamp/su3pjqclwfalltl10mn9.jpg',
                    filename: 'YelpCamp/su3pjqclwfalltl10mn9'
                }
            ]
        })
        
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})