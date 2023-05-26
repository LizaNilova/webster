const apiPath = 'http://localhost:8080/api';

export default {
  // POST
  createProject: () => [apiPath, 'project'].join('/'),

  //GET
  allProjects: () => [apiPath, 'project'].join('/'),
  projectByID: (id) => [apiPath, 'project', id].join('/'),

  // PATCH
  updateProject: (id) => [apiPath, 'project', id].join('/'),

  // DELETE
  deleteProject: (id) => [apiPath, 'project', id].join('/'),

};