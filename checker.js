import puppeteer from "puppeteer";
import { readFile, writeFile } from "node:fs/promises";
import dotenv from "dotenv";
import path from "path";
import { mail } from "./mail.js";

dotenv.config();

export async function checkWebsite() {
  console.log("Start checking");

  let oldContent = "";
  const contentPath = path.join(path.dirname(''), './content.txt');
  try {
    oldContent = await readFile(contentPath, { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
  }

  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      headless: false,
      timeout: 60000
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

    console.log("Current content:", content);

    await writeFile(contentPath, content, { encoding: 'utf8' });
    
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