import { IImageRepository } from '@/repositories/IImageRepository';
import { Image } from '@/models/Image';
import { inject, injectable } from 'inversify';
import { ILogger } from '@/services/ILogger';
import axios from 'axios';

@injectable()
export default class TheCatApiImageRepository implements IImageRepository {
    private _logger: ILogger;

    constructor(@inject(nameof<ILogger>()) logger: ILogger) {
        this._logger = logger;
    }

    async getImages(): Promise<Image[]> {
        try {
            this._logger.log('Fetching images from TheCatAPI.com');
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');

            this._logger.log('Received response from TheCatAPI.com');
            return response.data.map(x => ({
                id: x.id,
                url: x.url,
                title: x.id
            }));
        } catch (e) {
            this._logger.error('An error occurred while fetching images from TheCatAPI.com', e);
            return [];
        }
    }
}