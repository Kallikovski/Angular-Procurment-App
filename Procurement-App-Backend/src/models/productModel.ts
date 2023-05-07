import { Document, Schema, Model, model, Error } from "mongoose";

export interface IProduct extends Document {
    productname: string;
    price: Number;
    description: string;
    image: Buffer;
    creator: Schema.Types.ObjectId;
    customer: Schema.Types.ObjectId;
}

export const productSchema: Schema = new Schema({
    productname: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        unique: false,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


export const Product: Model<IProduct> = model("Product", productSchema);