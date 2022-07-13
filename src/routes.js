const apiRoute = '/api/v1';

const routes = {
  login: [apiRoute, 'login'].join('/'),
  data: [apiRoute, 'data'].join('/'),
  signup: [apiRoute, 'signup'].join('/'),
  pages: {
    login: '/login',
    chat: '/',
    signup: '/signup',
  },
};

export default routes;
