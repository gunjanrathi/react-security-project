import express from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Redis from "ioredis";

const app = express();
const redis = new Redis();
const bannedIPs = new Set(["192.168.1.1"]); // Example banned IPs

app.use((req, res, next) => {
  const ip = req.ip;
  if (bannedIPs.has(ip)) {
    return res.status(403).json({ message: "Access denied" });
  }
  redis.lpush("request_queue", JSON.stringify({ ip, url: req.url }));
  next();
});

app.get("/", (req, res) => res.send("Middleware Running"));

app.listen(4000, () => console.log("Middleware running on port 4000"));
