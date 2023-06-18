const express = require('express');
const cors = require('cors');
const compression = require('compression');
const swaggerUI = require("swagger-ui-express");
const YAML = require('yamljs');
const dockYaml = YAML.load('./docs/package-docs.yaml')
require('custom-env').env(process.env.BRANCH_NAME, './environments/');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

//sentry
const SENITRY_ENABLED_NAMESPACE = [`qa`, `prod`];
if (SENITRY_ENABLED_NAMESPACE.includes(process.env?.NAMESPACE_JK)) {
  Sentry.init({
    dsn: "https://db90cb7f9b974991a18c77fada01e5b2@o4504518546489344.ingest.sentry.io/4504592237658112",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({
        // to trace all requests to the default router
        app,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(compression());
app.use(cors());
app.set('view engine', 'pug');


/* entry point swagger */
app.use('/package/docs', swaggerUI.serve, swaggerUI.setup(dockYaml));

// The error handler must be before any other error middleware and after all controllers
app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status === 404 || error.status === 500) {
          return true;
        }
        return false;
      },
    })
  );

require('./init/routes')(app);
require('./init/redis')(app);
require('./init/db')();
require('./init/validation')();


module.exports = app;
