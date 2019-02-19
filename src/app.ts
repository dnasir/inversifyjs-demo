import { inject, injectable } from 'inversify';
import { ILogger } from '@/services/ILogger';
import { ImageService } from '@/services/ImageService';

@injectable()
export default class App {
    private _logger: ILogger;
    private _imageService: ImageService;

    constructor(
        @inject(nameof<ILogger>()) logger: ILogger,
        @inject(ImageService) imageService: ImageService
    ) {
        this._logger = logger;
        this._imageService = imageService;

        this.init();
    }

    async init() {
        this._logger.log('Application started');
        this._logger.log('Fetching image blocks from image service');
        const imageBlocks = await this._imageService.getImageBlocks();

        this._logger.log('Rendering image blocks to DOM');
        document.querySelector('#imageGrid').append(...imageBlocks);
    }
}