var SchemaObject = require('schema-object');
var BasicInfo = new SchemaObject({
    title: String,
    date: Date,
    time: String,
    price: String,
    currency: String,
    description: String,
    poster: String,
})
var Location = new SchemaObject({
    venue: String,
    street: String,
    number: Number,
    city: String,
    country: String,
    code: Number,
    description: String,
    pictures: [String],
    coordinates: String
})
var Band = new SchemaObject({
    name: String,
    description: String,
    link: String
})
var Concert = new SchemaObject({
    info: BasicInfo,
    location: Location,
    genres: [String],
    bands: [Band],
    likes: {type: Number, default: 0},
    assisting: {type: Number, default: 0},
    author: String
})
var ShortConcert = new SchemaObject({
    title: String,
    date: Date,
    time: String,
    price: String,
    currency: String,
    venue: String,
    city: String,
    coordinates: String,
    genres: [String],
    likes: {type: Number, default: 0},
    assisting: {type: Number, default: 0},
    poster: String,
})
var User = new SchemaObject({
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
})

export { Concert as Concert, Location as Location , BasicInfo as BasicInfo, Band as Band, ShortConcert as ShortConcert}