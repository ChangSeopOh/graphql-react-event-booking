const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type:String,
        required : true
    },
    description: {
        type:String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    date: {
        type: Date,
        required : true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
});
/* GraphQl Type
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
*/
                         //DbColletion , Schema
module.exports = mongoose.model('Event', eventSchema);