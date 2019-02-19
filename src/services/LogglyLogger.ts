import { ILogger } from '@/services/ILogger';
import { injectable } from 'inversify';

const _LTracker = window['_LTracker'] || [];

@injectable()
export class LogglyLogger implements ILogger {
    log(...args: any[]): void {
        _LTracker.push({
            'type': 'LOG',
            'data': args
        });
    }

    error(...args: any[]): void {
        _LTracker.push({
            'type': 'ERROR',
            'data': args
        });
    }
}