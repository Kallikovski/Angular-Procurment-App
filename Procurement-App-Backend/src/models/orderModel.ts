import { Document, Schema, Model, model, Error } from "mongoose";

/** Inferface for orderschema */
export interface IOrder extends Document {
    productname: string;
    price: Number;
    description: string;
    creator: Schema.Types.ObjectId;
    signed: Boolean;
    adminsigned: Boolean;
    customer: Schema.Types.ObjectId;
    status: string;
}

/** Defines the datamodel of an order */
export const orderSchema: Schema = new Schema({
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
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    signed: {
        type: Boolean,
        required: true,
    },
    adminsigned: {
        type: Boolean,
        required: false,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['ordered', 'invoice', 'shipped', 'cancelled'],
        unique: false,
        required: true,
    }
}, {
    timestamps: true
});

export const Order: Model<IOrder> = model("Order", orderSchema);