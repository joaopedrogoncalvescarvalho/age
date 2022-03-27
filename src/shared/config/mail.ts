import env from './env';

interface IMailConIMailConfigfig {
  driver: 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: env.contact.noReplay.name,
      email: env.contact.noReplay.email,
    },
  },
} as IMailConIMailConfigfig;
