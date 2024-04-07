import express, { Request } from "express";
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "../pool";

const userRouter = express.Router();

interface Payload {
  first_name: string,
  last_name: string,
  email: string
}

userRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await db.sql<s.users.SQL, s.users.Selectable[]>`
      SELECT * FROM ${"users"}`.run(pool);
      res.status(200).send(users);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  })
  .post(async (req, res) => {
    const { email, first_name, last_name } = <Payload>req.body;
    let user: s.users.JSONSelectable | undefined;
    try {
      user = await db
        .insert("users", {
          email: email,
          first_name: first_name,
          last_name: last_name,
        })
        .run(pool);
      res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
  );

userRouter
  .route("/:id")
  .get(async (req: Request<{ id: string }, {}, {}, {}>, res) => {
    const { params } = req;
    const { id } = params;
    try {
      const users = await db
        .select("users", {
          user_id: Number(id),
        })
        .run(pool);
      res.status(200).send(users[0]);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  });

export default userRouter;