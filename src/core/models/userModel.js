import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        keycloakId: {
            type: String,
            required: true,
            unique: true
        },
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
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        roles: [{
            type: String,
            enum: ['user', 'admin', 'hotel_manager']
        }]
    }, 
    { timestamps: true }
);

export default mongoose.model('users', userModel);
