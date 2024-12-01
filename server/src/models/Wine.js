import { Schema, model, Types } from "mongoose";

const wineSchema = new Schema({

    name: {
        type: String,
        required: true,
        minLength: [ 2, 'The name must be at least 2 characters']
    },
    type: {
        type: String,
        required: true,
        minLength: [ 2, 'The type is required' ],
    },
    grapeVariety: {
        type: String,
        required: true,
    },
    vintage: {
        type: Number,
        required: true,
        min: [ 1900, 'The vintage must be at least 1900'],
    },
    wineCellar: {
        type: String,
        required: true,
    },
    regionCountry: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [ 0, 'Price must be positive number' ],
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],    
    owner: {
        type: Types.ObjectId,
        ref: 'User',       
    },
});

const wine = model('wine', wineSchema);

export default wine;