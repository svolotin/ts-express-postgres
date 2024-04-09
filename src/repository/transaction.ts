import { type Request, type Response } from 'express';
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "../pool";

interface Payload {
  user_id: number,
  amount: number
}


export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, amount } = <Payload>req.body;
    let transact: s.transact.JSONSelectable | undefined;
    transact = await db
      .insert("transact", {
        user_id: user_id,
        amount: amount
      })
      .run(pool);

    const balance = await db.sql<s.transact.SQL, s.transact.Selectable[]>`SELECT SUM(amount) FROM ${"transact"} WHERE ${"user_id"} = ${db.param(user_id)}`.run(pool);
    res.status(200).send(balance);

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send({ msg: err.message });
    } else {
      res.status(500).send({ msg: 'An unexpected error occurred' });
    }
  }
};

