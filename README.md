This Node.js application checks content in the any website in the cron and in case of diffrences in the choosen html elements it sents email with new content.

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