var SchemaObject = require('schema-object')
var BasicInfo = new SchemaObject({
    title: String,
    date: Number,
    time: String,
    price: String,
    currency: String,
    description: String,
    poster: Object
})
var Location = new SchemaObject({
    venue: String,
    street: String,
    number: Number,
    city: String,
    country: String,
    code: Number,
    pictures: [String],
    coords: {
        lat: Number,
        lng: Number
    }
})
var Band = new SchemaObject({
    name: String,
    description: String,
    link: String
})
var Concert = new SchemaObject({
    info: Object,
    location: Location,
    genres: [String],
    bands: [Band],
    likes: {type: Number, default: 0},
    assisting: {type: Number, default: 0},
    author: String
})
var ShortConcert = new SchemaObject({
    title: String,
    date: Number,
    time: String,
    price: String,
    currency: String,
    venue: String,
    city: String,
    coordinates: String,
    country: String,
    genres: [String],
    likes: {type: Number, default: 0},
    assisting: {type: Number, default: 0},
    poster: Object
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
    picture: String
})

export { Concert, Location, BasicInfo, Band, ShortConcert, User }
