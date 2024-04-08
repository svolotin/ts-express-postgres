import express from 'express';
import request from 'supertest';
import userRouter from '../src/routers/userRouter'

var app = express();

app.use(express.json())
app.use("/user", userRouter);

// generating a random string for email field
function makeString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe("Verify users route", () => {

  const payload: JSON = <JSON><unknown>{
    "first_name": "john",
    "last_name": "doe",
    "email": makeString(4)
  }

  it("Should return json and 200", () => {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("Should return json and 200 when creating a user", () => {
    request(app)
      .post('/user')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("Should return error and 500 when creating a user with existing value in email field", () => {
    request(app)
      .post('/user')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  it("Should return json and 200 when fetching a single user", () => {
    request(app)
      .get('/user/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});