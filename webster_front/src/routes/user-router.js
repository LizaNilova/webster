const apiPath = 'http://localhost:8080/api';

export default {
  // POST
  createUserPath: () => [apiPath, 'users'].join('/'),
  setUserRolePath: () => [apiPath, 'users', 'role'].join('/'),
  setUserRolePath: () => [apiPath, 'users', 'ban'].join('/'),

  //GET
  allUsersPath: () => [apiPath, 'users'].join('/'),
  userProfile: () => [apiPath, 'users', 'profile'].join('/'),
  userByIdPath: (id) => [apiPath, 'user', id].join('/'),
};