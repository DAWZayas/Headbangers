var SchemaObject = require('schema-object');
module.exports= () => ({
        Concert : SchemaObject({
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
        }),   
        Location : SchemaObject({
            venue: String,
            street: String,
            number: Number,
            city: String,
            country: String,
            code: Number,
            description: String,
            pictures: [String],
            coordinates: String
        }),
        Band : SchemaObject({
            name: String,
            description: String,
            link: String,
            pictures: [String]
        }),
        ConcertsShort : SchemaObject({
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
        }),
        Users : SchemaObject({
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
})
