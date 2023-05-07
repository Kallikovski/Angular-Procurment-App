import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../config"

/** Inferface for UserSchema */
export interface IUser extends Document {
    username: string;
    postcode: Number;
    city: string;
    street: string;
    role: string;
    email: string;
    password: string;
    tokens: { _id: string | jwt.JwtPayload; token: string; }[];
    generateAuthToken: () => string;
    hashPassword: () => string;
}

export interface IModelUser extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>
}

/** Defines the datamodel of a user */
export const userSchema: Schema = new Schema({
    username: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    postcode: {
        type: Number,
        unique: false,
        required: false,
    },
    city: {
        type: String,
        unique: false,
        required: false,
        trim: true
    },
    street: {
        type: String,
        unique: false,
        required: false,
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Staff', 'Customer'],
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'creator'
})

userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'customer'
})

// userSchema.pre<IUser>("save", function save(next) {
//     const user = this;
//     bcrypt.genSalt(10, (error, salt) => {
//         if (error) {
//             return next(error);
//         }
//         bcrypt.hash(this.password, salt, (error, hash) => {
//             if (error) {
//                 return next(error);
//             }
//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.methods.hashPassword = async function () {
    const user = this;
    return bcrypt.hash(this.password, await bcrypt.genSalt(10));
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, config.server.jwt_secret)
    user.tokens = user.tokens.concat({
        token
    })
    user.save();

    return token;
};

userSchema.statics.findByCredentials = async function (email: string, password: string): Promise<IUser> {

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error('Unable to login, user not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login, password wrong')
    }

    return user
};

export const User: IModelUser = model<IUser, IModelUser>("User", userSchema);