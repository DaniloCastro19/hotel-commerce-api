import UserModel from '../../core/models/userModel.js';

class UsersRepository {
    async createUser(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }

    async getAllUsers() {
        return await UserModel.find();
    }

    async getUserById(id) {
        return await UserModel.findById(id);
    }

    async getUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async updateUser(id, userData) {
        return await UserModel.findByIdAndUpdate(id, userData, { new: true });
    }
    

    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

export default new UsersRepository();
