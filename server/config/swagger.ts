import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Express Library API'
    },
    servers: [
      {
        url: `${process.env.BASE_URL}:${process.env.APP_PORT}`
      }
    ]
  },
  apis: ['./routes/**/index.ts']
};

const specs = swaggerJsDoc(options);

export default specs;
