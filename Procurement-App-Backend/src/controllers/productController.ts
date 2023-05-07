import { Request, Response } from "express";
import { IProduct, Product } from "../models/productModel";

/** Class for handeling all product/item related requests*/
export class ProductController {
  /** Function for creating products*/
  public async createProduct(req: Request, res: Response) {
    await Product.findOne({ creator: req.user._id, productname: req.body.productname }, async (err: any, results: any) => {
      if (!err && results === null) {
        const product = new Product({
          ...req.body,
          creator: req.user._id,
        })
        try {
          await product.save()
          res.status(201).send({ product })
        } catch (e) {
          res.status(400).send(e)
        }
      } else {
        res.status(200).send("Product already exists")
      }
    })
  }
  /** Function for retrieving all products*/
  public async getProducts(req: Request, res: Response) {
    const sort: { [key: string]: any } = {}
    if (req.query.sort) {
      const parts = String(req.query.sort).split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
      const products: IProduct[] = await Product.find()
        .sort(sort)
      res.status(200).send(products)
    } catch (e) {
      res.status(500).send()
    }
  }
  /** Function for searching products*/
  public async searchProduct(req: Request, res: Response) {
    let query = {};
    if (req.query.productname) {
      query = req.query;
    }
    try {
      const products: IProduct[] = await Product.find(query)
      res.status(200).send(products)
    } catch (e) {
      res.status(500).send()
    }
  }
  /** Function for updating products*/
  public async updateProduct(req: Request, res: Response) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['productname', 'price', 'description', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
      if (req.user.role === "Admin") {
        Product.updateOne({ _id: req.query._id }, await req.body, { upsert: true }, async function (err, doc) {
          if (err) {
            return res.status(400).send({ error: err })
          }
          return res.status(200).send({ msg: 'updated' })
        });
      }
      if (req.user.role === "Staff") {
        Product.updateOne({ creator: req.user._id, _id: req.query._id }, await req.body, { upsert: true }, async function (err, doc) {
          if (err) {
            return res.status(400).send({ error: err })
          }
          return res.status(200).send({ msg: 'updated' })
        });
      }
    } catch (e) {
      res.status(400).send(e)
    }
  }
  /** Function for deleting products*/
  public async deleteProduct(req: Request, res: Response) {
    try {
      if (req.user.role === "Admin") {
        Product.findOneAndDelete(
          {
            _id: req.query._id
          },
          {},
          function (err, docs) {
            if (err) {
              console.log(err)
              res.status(400).send(err)
            }
            else {
              if (docs === null) {
                return res.status(204).send({ error: 'No product was deleted!' })
              }
              res.status(200).send(docs)
            }
          });
      }
      if (req.user.role === "Staff") {
        Product.findOneAndDelete(
          {
            creator: req.user._id,
            _id: req.query._id
          },
          {},
          function (err, docs) {
            if (err) {
              console.log(err)
              res.status(400).send(err)
            }
            else {
              if (docs === null) {
                return res.status(204).send({ error: 'No product was deleted!' })
              }
              res.status(200).send(docs)
            }
          });
      }
    } catch (e) {
      res.status(400).send(e)
    }
  }
  /** Function for retrieving own user created products*/
  public async getProductList(req: Request, res: Response) {
    const sort: { [key: string]: any } = {}
    if (req.query.sort) {
      const parts = String(req.query.sort).split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
      if (req.user.role === "Staff") {
        const products: IProduct[] = await Product.find({ creator: req.user._id })
          .sort(sort)
        return res.status(200).send(products)
      }
      else {
        const products: IProduct[] = await Product.find()
          .sort(sort)
        return res.status(200).send(products)
      }
    } catch (e) {
      res.status(500).send()
    }
  }
}
