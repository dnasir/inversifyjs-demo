import { Image } from '@/models/Image';

export interface IImageRepository {
    getImages(): Promise<Image[]>;
}