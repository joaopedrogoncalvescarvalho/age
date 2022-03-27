export default {
  env: process.env.ENV || 'development',
  cache: process.env.CACHE || 'redis',
  baseUrl: {
    api: process.env.BASE_URL_API || 'http://localhost:3333',
    web: process.env.BASE_URL_WEB || 'http://localhost:3000',
  },
  host: {
    api: process.env.HOST_API || 'localhost:3333',
    web: process.env.HOST_WEB || 'localhost:3000',
  },
  contact: {
    team: {
      name: 'Agenda [Team]',
      email: 'team@agenda.com.br',
    },
    suport: {
      name: 'Agenda [Suport]',
      email: 'suport@agenda.com.br',
    },
    noReplay: {
      name: 'Agenda [No replay]',
      email: 'no-replay@agenda.com.br',
    },
    errors: {
      name: 'Agenda [Errors]',
      email: 'errors@agenda.com.br',
    },
  },
};
