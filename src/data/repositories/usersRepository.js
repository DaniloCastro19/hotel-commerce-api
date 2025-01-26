import UserModel from '../../core/models/userModel.js';

export const create = async (userData) => {
    const user = new UserModel(userData);
    return await user.save();
};

export const findByNickname = async (nickname) => {
    return await UserModel.findOne({ nickname });
};

export const getAll = async () => {
    return await UserModel.find({});
};

export const getById = async (id) => {
    return await UserModel.findById(id);
};

export const update = async (id, userData) => {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
};

export const findAndDelete = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};
