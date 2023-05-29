import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import { CronJob } from "cron";
import { mail } from "./mail.js";
import { validate } from "./validate.js";

dotenv.config();

const checkWebsite = async () => {
  console.log("Start checking");

  let oldContent = "";
  try {
    oldContent = await readFile("content.txt", { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
  }

  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      headless: false,
    });

    // Create a page
    const page = await browser.newPage();

    // Go to your site
    await page.goto(process.env.SITE_URL);

    // Query for an element handle.
    const content = await page.$eval(
      process.env.SELECTOR,
      (node) => node.innerText
    );

    console.log("contentNew", content);

    await writeFile("content.txt", content, { encoding: 'utf8' });
    
    if (oldContent !== content) {
      console.log("Sent email");
      await mail(process.env.EMAIL_TITLE, content);
    } else {
      console.log("Nothing new");
    }

    // Close browser.
    await browser.close();
  } catch (error) {
    console.log(error);
    await mail(
      "Website checker error (" + process.env.SITE_URL + ")",
      JSON.stringify(error)
    );
  }
};

const job = new CronJob(
  process.env.CRON_TIME || "0 0 0 * * *",
  async function () {
    await checkWebsite();
  }
);

console.log("Init checking");
validate();
job.start();
