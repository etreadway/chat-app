# chat-app

## Running this app in Docker

From the home folder, run the following commands:

For the very first build before you run:

- `$ docker-compose build`

After you're built the first time, you can run via:

- `$ docker-compose up`

Or to run in detached (background mode):

- `$ docker-compose up -d`

Your client server will be running at `http://localhost:3000`
Your API server should be running at `http://localhost:5001`,
Your Postgres database will be running at: `http://localhost:5002`

It may take the client a long time to start up the first time. Be patient!

To stop and start the services:

- `$ docker-compose stop`
- `$ docker-compose start`

Or to restart:

- `$ docker-compose restart`

To kill the services:

- `CTRL + C` and then `$ docker-compose down`

If running in detached mode:

- `$ docker-compose down`
