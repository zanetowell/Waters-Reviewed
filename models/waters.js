const mongoose = require('mongoose')
const Schema = mongoose.Schema

const waterSchema = new Schema({
    name: { type: String, required: true},
    img: { type: String, required: true },
    description: { type: String, },
    type: { type: String, },
    reviews: [
        {
            name: { type: String},
            comments: { type: String},
            rating: { type: Number},
        }
    ]
})

const Water = mongoose.model('Water', waterSchema)

module.exports = Water