import jwt from 'jsonwebtoken';
import User from '../schemas/User.js';
import utils from '../utils/index.js';

const userApi = {};

userApi.login = async (req) => {
    const query = {
        email: req.body.email,
    };

    try {
        const user = await User.findOne(query);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await utils.comparePassword(req.body.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const secret = process.env.secret;
        const sign = jwt.sign({ username: user.registrationNumber }, secret);

        return { token: sign };
    } catch (e) {
        console.log('Failed to login', e);
        throw e;
    }
};

userApi.register = async (req) => {
    const password = await utils.hashPassword(req.body.password);

    const query = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        nationalId: req.body.nationalId,
    };

    const user = await User.find(query);
    if (user.length !== 0) {
        throw new Error('User already exists');
    }

    const data = {
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: password,
        nationalId: req.body.nationalId,
        email: req.body.email,
    };

    try {
        const user = await User.create(data);
        return {
            email: user.email,
            phoneNumber: user.phoneNumber,
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export default userApi;