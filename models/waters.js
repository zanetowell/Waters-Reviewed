const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    content: { type: String},
    rating: { type: Number, min: 1, max: 10, default: 5}
},
    {timestamps: true},    
)

const waterSchema = new Schema({
    name: { type: String, required: true},
    img: { type: String, required: true },
    description: { type: String, },
    type: { type: String, },
    reviews: [reviewSchema]
})

const Water = mongoose.model('Water', waterSchema)

module.exports = Water