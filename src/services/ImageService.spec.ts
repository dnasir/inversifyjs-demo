import 'reflect-metadata';
import container from '@/inversify.config';
import { ILogger } from './ILogger';
import { IImageRepository } from '@/repositories/IImageRepository';
import { ImageService } from './ImageService';
import * as TypeMoq from 'typemoq';

describe('Testing ImageService', () => {
    beforeEach(() => {
        // create a snapshot so we don't mess up the container
        container.snapshot();

        // replace ILogger with a mocked implementation
        container.unbind(nameof<ILogger>());
        container.bind<ILogger>(nameof<ILogger>()).toConstantValue(TypeMoq.Mock.ofType<ILogger>().object);
    });

    afterEach(() => {
        // restore the container to a recent snapshot for subsequent tests
        container.restore();
    });

    it('should call getImages', async () => {
        // remove existing binding
        container.unbind(nameof<IImageRepository>());

        // create a mock for the interface
        const mockImageRepo = TypeMoq.Mock.ofType<IImageRepository>();

        // bind the dependency interface to the mocked repo
        container.bind<IImageRepository>(nameof<IImageRepository>()).toConstantValue(mockImageRepo.object);

        // ask the container for an instance of the class
        const service = container.get(ImageService);

        // call the method we're testing
        const imageBlocks = await service.getImageBlocks();

        // unit test checks
        mockImageRepo.verify(x => x.getImages(), TypeMoq.Times.once());
        expect(imageBlocks).not.toBeNull();
        expect(imageBlocks.length).toBe(0);
    });

    it('should call build image blocks', async () => {
        // remove existing binding
        container.unbind(nameof<IImageRepository>());

        // create a mock for the interface
        const mockImageRepo = TypeMoq.Mock.ofType<IImageRepository>();

        // set up a mock response for the getImages repo method
        mockImageRepo.setup(x => x.getImages()).returns(() => Promise.resolve([{
            id: '1',
            url: 'path/to/image',
            title: 'lorem ipsum'
        }]));

        // bind the dependency interface to the mocked repo
        container.bind<IImageRepository>(nameof<IImageRepository>()).toConstantValue(mockImageRepo.object);

        // ask the container for an instance of the class
        const service = container.get(ImageService);

        // call the method we're testing
        const imageBlocks = await service.getImageBlocks();

        // unit test checks
        mockImageRepo.verify(x => x.getImages(), TypeMoq.Times.once());
        expect(imageBlocks).not.toBeNull();
        expect(imageBlocks.length).toBe(1);
        expect(imageBlocks[0] instanceof HTMLDivElement).toBe(true);
    });
});
