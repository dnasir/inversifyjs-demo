import 'reflect-metadata';
import container from '@/inversify.config';
import App from '@/app';

// fetch first dependency to kick off the resolution process
container.get<App>(App);