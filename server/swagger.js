const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const packageJson = require('./package.json')

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: "DREACA API DOCS",
            version: packageJson.version
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        }
    },
    apis: [`${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions = {
    explorer: true
};

module.exports = (app) => {
  app.use('/api-docs-dreaca', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
};
