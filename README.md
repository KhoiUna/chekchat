# ChekChat | The open-sourced app for assigning tasks

# Live demo

[Live demo](https://chekchat.khoiuna.info/)

- Test users:
  - Email: john@example.com &mdash; Password: John123456
  - Email: jane@example.com &mdash; Password: Jane123456
  - Email: ben@example.com &mdash; Password: Ben1234567

## Tech stack

- Front-end: NextJS, Material UI, Vercel
- Back-end: NodeJS Express, MongoDB, Heroku

## Instructions

1. `cd client && pnpm i` and `cd server && pnpm i` to install dependencies.
2. `cd client && cp .sample.env.local .env.local` then change the values.
3. `cd server && cp .sample.env .env` then change the values.
4. `./clienton.sh` and `./serveron.sh` to start the development NextJS and Express server respectively.

## Docs:

- [MongoDB's doc](./docs/mongo.md)
