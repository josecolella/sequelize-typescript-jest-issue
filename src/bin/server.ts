#!/usr/env/bin node
/**
 * @file Initializes the application, fetching all environment and secret manager, and param store variables,
 * the express app and port to listen on
 * @author Jose Colella <jose.colella@dynatrace.com>
 * @version 1.0
 */
// Emit decorator metadata
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('source-map-support').install();
// Libraries
import { Application, NextFunction, Request, Response, Router } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import applicationConfig from '../app';
import inversifyConfig from '../ioc/inversify.config';
import { logger } from '../utils/logger';

(async () => {
  const container: Container = inversifyConfig();
  const application: Application = applicationConfig();
  const port = 8080;

  const router: Router = Router({
    mergeParams: true,
    caseSensitive: true,
    strict: false
  });

  const server: InversifyExpressServer = new InversifyExpressServer(container, router, { rootPath: '/' }, application);
  server.setErrorConfig((app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ error: true, message: 'Endpoint is not found' });
    });
  });
  const serverInstance = server.build();
  serverInstance.listen(port, '0.0.0.0', () => {
    logger.info(`Applicationlistening on ${port}`);
  });
})()
  .then(() => {
    logger.info('Application has been initialized');
  })
  .catch((error: Error) => {
    throw error;
  });
