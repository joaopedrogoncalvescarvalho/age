import { hash, compare } from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import { sign } from 'jsonwebtoken';
import hashConfig from '../../../config/hash';
import jwtConfig from '../../../config/jwt';

import IHashProvider, { IRandomString, IJWTConfig } from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashed = hash(payload, Number(hashConfig.salt));

    return hashed;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async randomString({ length = 64, type = 'hex' }: IRandomString): Promise<string> {
    return ''; /* cryptoRandomString({
      length,
      type,
    }); */
  }

  public genarateJsonWebToken(
    subject: string,
    { privateKey, expiresIn }: IJWTConfig = {
      privateKey: jwtConfig.privateKey,
      expiresIn: jwtConfig.expiresIn,
    },
    payload?: object,
  ): string {
    const token = sign(
      {
        id_user: subject,
        ...payload,
      },
      privateKey,
      {
        subject: subject.toString(),
        expiresIn,
      },
    );

    return token;
  }
}

export default HashProvider;
