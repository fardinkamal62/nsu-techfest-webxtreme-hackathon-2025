import mongoose from 'mongoose';
import moment from 'moment-timezone';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		unique: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	nationalId: {
		type: String,
		required: true,
		unique: true,
	},
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    picture: {
        type: String,
        default: null,
    },
	createdAt: {
		type: String,
		default:() => moment().tz('Asia/Dhaka').format(),
	},
	updatedAt: {
		type: String,
		default:() => moment().tz('Asia/Dhaka').format(),
	}
});

const User = mongoose.model('User', userSchema);

export default User;
