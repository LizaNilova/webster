const apiPath = 'http://localhost:8080/api';

export default {
  // POST
  createPostPath: () => [apiPath, 'posts'].join('/'),

  //GET
  allPostsPath: (sort, filter, search) => [apiPath, 'posts'].join('/').concat(`?sort=${sort}&filter=${filter}&search=${search}`),
  postByIdPath: (id) => [apiPath, 'posts', id].join('/'),

  // PATCH
  updatePostPath: (id) => [apiPath, 'posts', id].join('/'),

  // DELETE
  deletePostPath: (id) => [apiPath, 'posts', id].join('/'),

};