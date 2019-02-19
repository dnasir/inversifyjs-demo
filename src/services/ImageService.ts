import { inject, injectable } from 'inversify';
import { IImageRepository } from '@/repositories/IImageRepository';
import { ILogger } from '@/services/ILogger';

@injectable()
export class ImageService {
    @inject(nameof<ILogger>())
    private _logger: ILogger;

    @inject(nameof<IImageRepository>())
    private _imageRepository: IImageRepository;

    async getImageBlocks(): Promise<HTMLDivElement[]> {
        try {
            this._logger.log('Fetching images from image repository');
            const images = await this._imageRepository.getImages();
            this._logger.log('Received images from image repository');

            this._logger.log('Building image blocks');
            return images.map(image => {
                const img: HTMLImageElement = document.createElement('img');
                img.src = image.url;
                img.title = image.title;

                const div = document.createElement('div');
                div.appendChild(img);

                return div;
            });
        } catch (e) {
            this._logger.error('An error has occurred while creating image blocks', e);
            return [];
        }
    }
}