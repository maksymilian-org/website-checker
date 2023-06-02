This Node.js application checks the content of any website in the cron. In case of differences in the selected HTML elements, it sends an email with the new content.

Application could be used in two different ways:
1. Inside Node.js cron jobs:
  * Put value for `CRON_TIME` environment variable
  * Run `npm start`

2. By request to the server:
  * Run `npm run server`
  * Call http://localhost:3000/healthz

## Access token
Create a new empty gist file here: https://gist.github.com/ and generate a access token: https://github.com/settings/tokens/new?scopes=gist, then putproper values in `GIST_TOKEN` and `GIST_ID` environment variables.

## Environment variables:
* `SITE_URL` - The URL of the site to check, e.g. `http://example.com`
* `EMAIL_FROM_NAME` - Name of the email sender
* `EMAIL_FROM` - Email address of the email sender
* `EMAIL_PASSWORD` - Email account password 
* `EMAIL_HOST` - Email account host, e.g.  `thehost.example.com`
* `EMAIL_PORT` - Email account, e.g. `465`
* `EMAIL_TO` - Email address of the recipient of the email
* `EMAIL_TITLE` - Email title
* `SELECTOR` - HTML selector to check on the website, e.g. `.some-class section`
* `CRON_TIME` - Cron time to execute checking, e.g. `* * 10,14 * * *`. See the documentation: http://crontab.org/
* `GIST_TOKEN` - Token to push website content into the Gist repository
* `GIST_ID` - ID of the Gist repository with the latest version of website content