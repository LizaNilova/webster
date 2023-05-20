const apiPath = 'http://localhost:8080/api';

export default {
  loginPath: () => [apiPath, 'auth', 'login'].join('/'),
  registerPath: () => [apiPath, 'auth', 'registration'].join('/'),
  logoutPath: () => [apiPath, 'auth', 'logout'].join('/'),
  refreshTokenPath: () => [apiPath, 'auth','refresh'].join('/'),
  confirmUserPath: (id) => [apiPath, 'auth','confirm', id].join('/'),
};
