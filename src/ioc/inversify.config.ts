import { Container } from 'inversify';
import '../components';
import { HEALTH_CHECK_CONFIG, HealthCheckConfig } from '../components/healthCheck/healthCheck.controller';
export default () => {
  const container = new Container();

  container.bind<HealthCheckConfig>(HEALTH_CHECK_CONFIG).toConstantValue({
    uptimeMillis: undefined,
    apiVersion: '1',
    environment: process.env.NODE_ENV,
    author: process.env.AUTHOR,
    buildDate: process.env.BUILD_DATE,
    gitCommit: process.env.GIT_COMMIT
  });
  return container;
};
