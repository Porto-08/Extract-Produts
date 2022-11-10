import { Injectable } from '@nestjs/common';
import db from './config/database/mongoose';

@Injectable()
export class AppService {
  healthCheck(): any {
    const extractionHistory = db.collection('ExtractionHistory').findOne();
    const uptime = process.uptime();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    let databaseStatus = 'OK';

    db.on('error', () => {
      databaseStatus = 'ERROR';
    });

    db.once('open', () => {
      databaseStatus = 'OK';
    });

    return {
      memoryUsed: `${Math.round((used / 1024 / 1024) * 100) / 100} MB`,
      extractionHistory,
      uptime: `${Math.round(uptime)} seconds`,
      databaseStatus: databaseStatus,
    };
  }
}
