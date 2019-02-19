import { ILogger } from '@/services/ILogger';
import { injectable } from 'inversify';

@injectable()
export class ConsoleLogger implements ILogger {
    log(...args: any[]): void {
        console.log(...args);
    }

    error(...args: any[]): void {
        console.error(...args);
    }
}