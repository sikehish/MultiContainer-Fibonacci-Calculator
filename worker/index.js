const keys = require("./keys");
const redis = require("redis");

// If you need to send regular commands to Redis while in subscriber mode, just open another connection with a new client (hint: use client.duplicate()).
// https://github.com/NodeRedis/node_redis#publish--subscribe

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000, //The function should return a number, which will be the amount of time in milliseconds to wait before retrying the connection. If the function returns null or undefined, the client will not retry the connection.
});

function fib(index) {
  if (index < 2) return index;
  return fib(index - 1) + fib(index - 2);
}
redisClient.subscribe("insert");

redisClient.on("message", (channel, message) => {
  redisClient.hSet("values", message, fib(parseInt(message)));
});
