import { container } from 'tsyringe';

import HashProvider from '../implementations/HashProvider';
import IHashProvider from '../models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
