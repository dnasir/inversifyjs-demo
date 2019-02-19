import { IImageRepository } from '@/repositories/IImageRepository';
import { Image } from '@/models/Image';
import { inject, injectable } from 'inversify';
import { ILogger } from '@/services/ILogger';
import axios from 'axios';

@injectable()
export default class SplashBaseImageRepository implements IImageRepository {
    @inject(nameof<ILogger>())
    private _logger: ILogger;

    async getImages(): Promise<Image[]> {
        try {
            this._logger.log('Fetching images from splashbase.co');
            const response = await axios.get('http://www.splashbase.co/api/v1/images/latest');

            this._logger.log('Received response from splashbase.co');
            return response.data.images.map(x => ({
                id: x.id,
                url: x.url,
                title: x.id
            }));
        } catch (e) {
            this._logger.error('An error occurred while fetching images from splashbase.co', e);
            return [];
        }
    }
}