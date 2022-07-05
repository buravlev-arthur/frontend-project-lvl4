const apiRoute = '/api/v1';

const routes = {
  login: [apiRoute, 'login'].join('/'),
  data: [apiRoute, 'data'].join('/'),
};

export default routes;
