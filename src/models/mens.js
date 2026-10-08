const mongoose = require('mongoose');

const mensSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Score: {  
        type: Number,
        required: true
    },
    event: {
        type: String,
        default: "100m"
    }   
});

//creating a model named 'Mens' using the defined schema
const Mens = mongoose.model('Mens', mensSchema);  

module.exports = Mens;  //exporting the model for use in other files