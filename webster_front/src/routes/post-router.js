const apiPath = 'http://localhost:8080/api';

export default {
  // POST
  createPostPath: () => [apiPath, 'posts'].join('/'),

  //GET
  allPostsPath: () => [apiPath, 'posts'].join('/'),
  postByIdPath: (id) => [apiPath, 'posts', id].join('/'),

  // PATCH
  updatePostPath: (id) => [apiPath, 'posts', id].join('/'),

  // DELETE
  deletePostPath: (id) => [apiPath, 'posts', id].join('/'),

};