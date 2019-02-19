import { Container } from 'inversify';
import { ILogger } from '@/services/ILogger';
import { ConsoleLogger } from '@/services/ConsoleLogger';
import App from '@/app';
import { IImageRepository } from '@/repositories/IImageRepository';
import TheCatApiImageRepository from '@/repositories/TheCatApiImageRepository';
import { ImageService } from '@/services/ImageService';
import SplashBaseImageRepository from './repositories/SplashBaseImageRepository';

const container = new Container();
container.bind<ILogger>(nameof<ILogger>()).to(ConsoleLogger).inSingletonScope();
container.bind<IImageRepository>(nameof<IImageRepository>()).to(SplashBaseImageRepository).inSingletonScope();
container.bind(ImageService).toSelf().inSingletonScope();
container.bind<App>(App).toSelf();

export default container;