import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default () => {
  const app = express();
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(cookieParser());
  // Security module, other headers are added in nginx from UI
  app.use(helmet());

  app.set('trust proxy', 1);
  // Session middleware
  return app;
};
