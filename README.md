# Course Notifier
Simple utility to send SMS messages on the current status of Stevens courses

## How to Use
1. Add your Twilio config & target phone number to `default.env` and rename to `.env`
2. Replace the `WANTED_COURSES` array in `index.js` with the call numbers of the courses you want to be notified of.
3. Setup as a cron job for every few hours (the Stevens listing have weird update times depending on peak loads)
4. ...
5. Profit 