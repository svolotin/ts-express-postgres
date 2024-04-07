import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter";

dotenv.config();
const app: Express = express();
const port = process.env.NODE_PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Nothing here!");
});
app.use(express.json())
app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
