import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            type: String,
            enum: ['admin', 'user', 'unlogged'],
            default: ['unlogged']
        }]
    }, 
    { 
        timestamps: true,
        collection: 'users'
    }
);

userModel.index({ email: 1 }, { unique: true });

const User = mongoose.model('users', userModel);

User.syncIndexes();

export default User;
