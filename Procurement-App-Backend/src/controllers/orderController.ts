import { Request, Response } from "express";
import { IOrder, Order } from "../models/orderModel";

/** Class for handeling all order related requests*/
export class OrderController {
    /** Function for creating new orders*/
    public async createOrder(req: Request, res: Response) {
        try {
            for (const item of req.body) {
                let adminsigned = true;
                if (item.price >= 50000) {
                    adminsigned = false;
                }
                const product = new Order({
                    productname: item.productname,
                    price: item.price,
                    description: item.description,
                    creator: item.creator,
                    signed: false,
                    status: "ordered",
                    adminsigned: adminsigned,
                    customer: req.user._id,
                })
                await product.save();
            }
            res.status(201).send(req.body)
        } catch (e) {
            res.status(400).send(e)
        }
    }
    /** Function for retrieving orders*/
    public async getOrders(req: Request, res: Response) {
        const sort: { [key: string]: any } = {}
        if (req.query.sort) {
            const parts = String(req.query.sort).split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
        try {
            if (req.user.role == "Customer") {
                const orders: IOrder[] = await Order.find({ customer: req.user._id })
                    .sort(sort)
                return res.status(200).send(orders)
            }
            if (req.user.role == "Staff") {
                const orders: IOrder[] = await Order.find({ creator: req.user._id })
                    .sort(sort)
                return res.status(200).send(orders)
            }
            else {
                const orders: IOrder[] = await Order.find({ price: { $gt: 50000 } })
                    .sort(sort)
                return res.status(200).send(orders)
            }
        } catch (e) {
            res.status(500).send()
        }
    }
    /** Function for updating orders*/
    public async updateOrder(req: Request, res: Response) {
        console.log("updateOrder")
        try {
            if (req.user.role === "Admin") {
                const updates = Object.keys(req.body)
                const allowedUpdates = ['adminsigned']
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
                if (!isValidOperation) {
                    return res.status(400).send({ error: 'Invalid updates!' })
                }
                Order.updateOne({ _id: req.query._id }, await req.body, { upsert: true }, async function (err, doc) {
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ error: err })
                    }
                    console.log("updated Admin")
                    return res.status(200).send({ msg: 'updated' })
                });
                // return res.status(200).send("No changes made!")
            }
            if (req.user.role === "Staff") {
                const updates = Object.keys(req.body)
                const allowedUpdates = ['signed', 'status']
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
                if (!isValidOperation) {
                    return res.status(400).send({ error: 'Invalid updates!' })
                }
                Order.updateOne({ _id: req.query._id }, await req.body, { upsert: true }, async function (err, doc) {
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ error: err })
                    }
                    console.log("updated Staff")
                    return res.status(200).send({ msg: 'updated' })
                });
                // return res.status(200).send("No changes made!")
            }
            if (req.user.role === "Customer") {
                const updates = Object.keys(req.body)
                const allowedUpdates = ['status']
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
                if (!isValidOperation) {
                    return res.status(400).send({ error: 'Invalid updates!' })
                }
                Order.updateOne({ _id: req.query._id }, await req.body, { upsert: true }, async function (err, doc) {
                    if (err) {
                        console.log(err)
                        return res.status(400).send({ error: err })
                    }
                    console.log("updated Customer")
                    return res.status(200).send({ msg: 'updated' })
                });
                // return res.status(200).send("No changes made!")
            }
        } catch (e) {
            res.status(400).send(e)
        }
    }
}