import bc from 'bcrypt';

const utils = {};

utils.checkRequiredFields = (requiredFields, body) => {
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
    }
};

utils.hashPassword = async (plaintextPassword) => {
	return await bc.hash(plaintextPassword, 10);
};

utils.comparePassword = async (plaintextPassword, hash) => {
	return await bc.compare(plaintextPassword, hash);
};

utils.randomText = () => {
	return Math.random().toString(36).substr(2, 15);
};

export default utils;