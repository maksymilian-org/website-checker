import puppeteer from "puppeteer";
import dotenv from "dotenv";
import { Octokit } from "octokit";
import { mail } from "./mail.js";

dotenv.config();

export async function checkWebsite() {
  console.log("Start checking");

  let oldContent = "";
  let fileContent = "";

  const octokit = new Octokit({
    auth: process.env.GIST_TOKEN,
  });

  try {
    const gist = await octokit.request(`GET /gists/${process.env.GIST_ID}`, {
      gist_id: "GIST_ID",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const files = await gist.data.files;
    fileContent = Object.keys(files)[0];
    const file = files[fileContent];
    oldContent = file.content;
    console.log("Old content:", oldContent);
  } catch (error) {
    console.log(error);
  }

  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      headless: 'new',
      timeout: 60000,
      args: ['--no-sandbox']
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

    if (oldContent !== content) {
      console.log("Save current content to Gist");
      try {
        await octokit.request(`PATCH /gists/${process.env.GIST_ID}`, {
          gist_id: "GIST_ID",
          description: "Content of the page for the website-checker app",
          files: {
            [fileContent]: {
              content,
            },
          },
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
      } catch (error) {
        console.log(error);
      }

      console.log("Send email");
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
}
