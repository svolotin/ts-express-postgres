import express, { Request } from "express";
import { createUser, getUserById, getUsers } from '../repository/user';

const userRouter = express.Router();

interface Payload {
  first_name: string,
  last_name: string,
  email: string
}

userRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      await getUsers(req, res);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      await createUser(req, res);
    } catch (err) {
      next(err);
    }
  }
  );

userRouter
  .route("/:id")
  .get(async (req: Request<{ id: string }, {}, {}, {}>, res, next) => {
    try {
      await getUserById(req, res);
    } catch (err) {
      next(err);
    }
  });

export default userRouter;