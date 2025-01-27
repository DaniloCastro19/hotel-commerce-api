import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        nickname: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
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
userModel.index({ nickname: 1 }, { unique: true });

const User = mongoose.model('users', userModel);

User.syncIndexes();

export default User;
