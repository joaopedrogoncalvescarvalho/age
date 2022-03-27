interface IJwt {
  expiresIn: string;
  privateKey: string;
}

export default {
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  privateKey: process.env.JWT_PRIVATE_KEY || '5c8499aa138425ff56766782eac8bf67',
} as IJwt;
