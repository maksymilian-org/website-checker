import dotenv from "dotenv";
import { CronJob } from "cron";
import { validate } from "./validate.js";
import { checkWebsite } from "./checker.js";

dotenv.config();

const job = new CronJob(
  process.env.CRON_TIME || "0 0 0 * * *",
  async function () {
    await checkWebsite();
  }
);

console.log("Init checking");
validate();
job.start();
