import { Injectable } from '@nestjs/common';
import { IHealthCheck } from './interface';
import db from './shared/config/database/mongoose';

@Injectable()
export class AppService {
  async healthCheck(): Promise<IHealthCheck> {
    const extractionHistory = await db
      .collection('ExtractionHistory')
      .findOne();

    const memory = process.memoryUsage().heapUsed / 1024 / 1024;
    const uptime = process.uptime();
    const cpu = process.cpuUsage().user / 1000;
    let database = true;

    db.on('error', () => {
      database = false;
    });

    db.once('open', () => {
      database = true;
    });

    return {
      memory,
      uptime,
      database,
      cpu,
      extractionHistory: extractionHistory,
    };
  }
}
