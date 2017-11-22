//Documentation => https://www.npmjs.com/package/schema-object

var SchemaObject = require('schema-object');

//Concerts

var Concert = SchemaObject({
    title: String,
    date: Date,
    time: Date,
    price: Number,
    description: String,
    picture: String,
    location: String,
    genres: [String],
    bands: [String],
    likes: Number,
    assisting: Number
});

//Locations

var Location = SchemaObject({
    venue: String,
    street: String,
    number: Number,
    city: String,
    country: String,
    code: Number,
    description: String,
    pictures: [String],
    coordinates: String
});

//Bands

var Bands = SchemaObject({
    name: String,
    description: String,
    link: String,
    pictures: [String]
});

//Genres

var Genres = SchemaObject({
    genre: String
});

//ConcertsShort

var ConcertsShort = SchemaObject({
    id: String,
    title: String,
    datetime: Date,
    price: Number,
    venue: String,
    city: String,
    coordinates: String,
    genres: [String],
    likes: Number,
    assisting: Number
});

//Users

var Users = SchemaObject({
    name: String,
    mail: String,
    language: String,
    city: String,
    country: String,
    assisting: [String],
    likes: Number,
    saved: [String],
    published: [String],
    preferedgenres: [String],
    picture: String, 
});
