const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const options = {

}

//here I'm creating a new recipe
let newRecipe = {
    title: 'robertsTrying ;-)',
    level: 'Easy Peasy',
    ingredients: ['letMeSee',
        'again',
        'and',
        'again',
        'smiley'
    ],
    cuisine: 'brazil',
    dishType: 'dessert',
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 30,
    creator: 'Robert'
}

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        Recipe.create(newRecipe)
            .then((responseDB) => {
                console.log('My delicious recipe', responseDB)
                    //importing an array of recipes from the data.json file
                return Recipe.insertMany(data)
            })
            .then(() => {
                return Recipe.findOneAndUpdate({ title: 'Denis Brazilian Food' }, { duration: 100 })
            })
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });