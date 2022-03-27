export interface IRandomString {
  length?: number;
  type?:
    | 'base64'
    | 'hex'
    | 'url-safe'
    | 'numeric'
    | 'distinguishable'
    | 'ascii-printable'
    | 'alphanumeric'
    | undefined;
}

export interface IJWTConfig {
  expiresIn: string;
  privateKey: string;
}

interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
  randomString(randomString: IRandomString): Promise<string>;
  genarateJsonWebToken(subject: string, jwtConfig?: IJWTConfig, payload?: object): string;
}

export default IHashProvider;
