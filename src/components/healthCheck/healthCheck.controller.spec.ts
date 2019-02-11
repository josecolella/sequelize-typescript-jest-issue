import 'reflect-metadata';

import { HealthCheckController } from './healthCheck.controller';

describe('Health Check Controller', () => {
  let healthCheckController: HealthCheckController;

  beforeAll(() => {
    healthCheckController = new HealthCheckController({
      uptimeMillis: process.uptime(),
      apiVersion: '1',
      environment: 'dev',
      author: 'test',
      buildDate: '12345',
      gitCommit: 'asjkjas123'
    });
  });

  it('should return object', async () => {
    expect(await healthCheckController.getHealthCheckStatus()).toBeInstanceOf(Object);
  });
});
