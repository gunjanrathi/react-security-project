/* eslint-disable no-constant-condition */
import Redis from "ioredis";
const redis = new Redis();

async function processQueue() {
  while (true) {
    const data = await redis.rpop("request_queue");
    if (data) {
      console.log("Processing request:", JSON.parse(data));
    }
  }
}

processQueue();
