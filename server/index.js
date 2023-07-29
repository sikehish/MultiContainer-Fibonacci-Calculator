const keys = require("./keys");

//Express App
const express = require("express");
const cors = require("cors");

//Initialising express app
const app = express();
app.use(cors());
app.use(express.json());

//Postgres Client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("error", () => console.log("Postgres connection failed"));

// pgClient.on("connect", (client) => {
//   client
//     .query("CREATE TABLE IF NOT EXISTS values (number INT)")
//     .catch((err) => console.error(err));
// });
//OR
pgClient.on("connect", async (client) => {
  try {
    await client.query("CREATE TABLE IF NOT EXISTS values (number INT)");
  } catch (err) {
    console.log(err);
  }
});

//REDIS Client Setup
const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

//Route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  const values = await redisClient.hGetAll("values");
  res.send(values);
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) return res.status(422).send("Number too high!");
  redisClient.hSet("values", index, "None"); //to be processed by worker.js
  redisClient.publish("insert", index); //publishes a message(index in this case) to a channel(insert). The method takes two arguments: the channel name and the message to be published. The worker.js subscribes to the channel "insert" and on the event 'message'
  //The .publish() method does not trigger any events by itself. However, if you are using the redisClient.on() method to listen for events, you will receive a message event when a message is published to a channel that the client is subscribed to.

  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ message: "Processing..." });
});

app.listen(8000, () => {
  console.log("Listening");
});
