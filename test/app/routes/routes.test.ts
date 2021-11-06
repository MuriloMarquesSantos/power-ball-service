import routes from "../../../app/routes";

import request from "supertest";
import express from "express";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

test("index route works", (done) => {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect({ message: "Hello World" })
    .expect(200, done);
});

test("Not found works", (done) => {
  request(app).get("/not-found").expect(404, done);
});

it("Should throw error with invalid request", (done) => {
  request(app)
    .post("/ticket")
    .send({ date: "12-10-2020" })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should return 200 with a valid ticket request", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-10-21",
      picks: [
        {
          ticketNumbers: ["51", "06", "03", "26", "35", "17"],
        },
      ],
    })
    .expect(200)
    .then(() => {
      done();
    });
});

it("Should return 400 with a invalid ticket number", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-10-21",
      picks: [
        {
          ticketNumbers: ["51", "a", "03", "26", "35", "17"],
        },
      ],
    })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should return 400 with a invalid less than 6 ticket numbers", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-10-21",
      picks: [
        {
          ticketNumbers: ["51", "03", "26", "35", "17"],
        },
      ],
    })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should return 400 with an invalid date", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "abc",
      picks: [
        {
          ticketNumbers: ["51", "03", "26", "35", "17"],
        },
      ],
    })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should return 400 with an invalid date value", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-90-90",
      picks: [
        {
          ticketNumbers: ["51", "03", "26", "35", "17"],
        },
      ],
    })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should throw error 400 with no picks", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-10-10",
      picks: [],
    })
    .expect(400)
    .then(() => {
      done();
    });
});

it("Should throw error 400 with ticket number greater than 69", (done) => {
  request(app)
    .post("/ticket")
    .send({
      date: "2021-10-10",
      picks: [
        {
          ticketNumbers: ["80", "03", "26", "35", "17", "02"],
        },
      ],
    })
    .expect(400)
    .then(() => {
      done();
    });
});
