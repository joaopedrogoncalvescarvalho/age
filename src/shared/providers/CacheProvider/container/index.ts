import { container } from 'tsyringe';
import envConfig from '../../../config/env';
import RedisCacheProvider from '../implementations/RedisCacheProvider';
import LocalCacheProvider from '../implementations/LocalCacheProvider';
import ICacheProvider from '../models/ICacheProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  envConfig.env === 'development' && envConfig.cache === 'local'
    ? LocalCacheProvider
    : RedisCacheProvider,
);
