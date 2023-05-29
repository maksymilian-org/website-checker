export function validate() {
  console.log("Run validator");
  try {
    if (!process.env.SITE_URL) {
      throw new Error("Please specify the SITE_URL environment variable");
    } else if (!process.env.EMAIL_FROM_NAME) {
      throw new Error("Please specify the EMAIL_FROM_NAME environment variable");
    } else if (!process.env.EMAIL_FROM) {
      throw new Error("Please specify the EMAIL_FROM environment variable");
    } else if (!process.env.EMAIL_PASSWORD) {
      throw new Error("Please specify the EMAIL_PASSWORD environment variable");
    } else if (!process.env.EMAIL_PORT) {
      throw new Error("Please specify the EMAIL_PORT environment variable");
    } else if (!process.env.EMAIL_TO) {
      throw new Error("Please specify the EMAIL_TO environment variable");
    } else if (!process.env.EMAIL_TITLE) {
      throw new Error("Please specify the EMAIL_TITLE environment variable");
    } else if (!process.env.SELECTOR) {
      throw new Error("Please specify the SELECTOR environment variable");
    } else if (!process.env.CRON_TIME) {
      throw new Error("Please specify the CRON_TIME environment variable");
    } else {
      console.log("Environment variables are correctly set");
    }
  } catch(error) {
    console.log(error);
  }
} 