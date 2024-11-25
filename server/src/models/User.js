import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: [ true, 'Username is required!' ],
        unique: true, // Index
        
    },
    email: {
        type: String,
        required: [ true, 'Email is required!' ],
        unique: true, // Index
        
    },
    password: {
        type: String,
        required: [ true, 'Password is required!' ],
        
    },
});
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
});

const User = model('User', userSchema);

export default User;