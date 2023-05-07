import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";


/** Class for handeling all order user requests*/
export class UserController {
  /** Function for registrating users*/
  public async registerUser(req: Request, res: Response) {
    await User.findOne({ email: req.body.email }, async (err: any, results: any) => {
      if (!err && results === null) {
        const user = new User(req.body)
        user.password = await user.hashPassword()
        try {
          await user.save()
          const token = await user.generateAuthToken()
          res.status(201).send({ user, token })
        } catch (e) {
          res.status(400).send(e)
        }
      } else {
        res.status(200).send("User already exists")
      }
    })
  }
  /** Function for authenticating users*/
  public async authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.status(200).send({ user, token })
    } catch (e) {
      res.status(400).send(e)
    }
  }
  /** Function for login out users*/
  public async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
      res.status(200).send()
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
  /** Function for retrieving user information*/
  public async getUser(req: Request, res: Response) {
    res.status(200).send(req.user);
  }
  /** Function for updating user information*/
  public async updateUser(req: Request, res: Response) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'postcode', 'city', 'street', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
      if (req.body.password) {
        if (req.body.password == "") {
          return res.status(200).send()
        }
        else {
          req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
        }
      }
      User.updateOne({ _id: req.user._id }, await req.body, { upsert: true }, async function (err, doc) {
        if (err) {
          return res.status(400).send({ error: err })
        }
        res.status(200).send()
      });
    } catch (e) {
      res.status(400).send(e)
    }
  }
}
