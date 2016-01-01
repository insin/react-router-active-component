This project uses [nwb](https://github.com/insin/nwb) for building and running tests, with common development commands configured as npm run scripts. If you have nwb installed globally, you can use it directly insted of the npm run scripts below.

## Developing

Use `npm run test:watch` to start a Karma server which runs units tests on every change.

Use `npm test` to lint, build and run tests before submitting a Pull Request - Travis CI will be running this too.

If you're tweaking or testing the demo app, you can start a hot reloaded version of it using `npm start`.

To lint code, run `npm run lint`.
