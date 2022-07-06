const apiRoute = '/api/v1';

const routes = {
  login: [apiRoute, 'login'].join('/'),
  data: [apiRoute, 'data'].join('/'),
  pages: {
    login: '/login',
    chat: '/',
  },
};

export default routes;
