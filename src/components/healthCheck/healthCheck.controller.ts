import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { Person } from './person.model';

export const HEALTH_CHECK_CONFIG: symbol = Symbol.for('HealthCheckConfig');

export interface HealthCheckConfig {
  uptimeMillis: number | undefined;
  apiVersion: string | undefined;
  environment: string | undefined;
  author: string | undefined;
  buildDate: string | undefined;
  gitCommit: string | undefined;
}

@controller('/healthStatus')
export class HealthCheckController implements interfaces.Controller {
  public static TARGET_NAME: string = 'HealthCheckStatusController';
  constructor(@inject(HEALTH_CHECK_CONFIG) private readonly healthCheckConfiguration: HealthCheckConfig) {}

  @httpGet('/')
  public async getHealthCheckStatus(): Promise<any> {
    try {
      const person = Person.build({ name: 'Person', birthday: new Date() });
      return {
        name: person.name,
        health: this.healthCheckConfiguration
      };
    } catch (error) {
      throw error;
    }
  }
}
