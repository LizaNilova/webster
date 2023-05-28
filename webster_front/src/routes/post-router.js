const apiPath = 'http://localhost:8080/api';

export default {
  // POST
  createPostPath: () => [apiPath, 'posts'].join('/'),
  likePost: (id) => [apiPath, 'likes', 'post', id].join('/'),
  createPostComment: (id) => [apiPath, 'comments', 'post', id].join('/'),
  reportPost: (id) => [apiPath, 'posts', 'report', id].join('/'),
  //GET
  allPostsPath: (sort, filter, search, page) => [apiPath, 'posts'].join('/').concat(`?sort=${sort}&filter=${filter}&search=${search}&page=${page}`),
  postByIdPath: (id) => [apiPath, 'posts', id].join('/'),
  banPostById: (id) => [apiPath, 'posts', 'ban', id].join('/'),

  // PATCH
  updatePostPath: (id) => [apiPath, 'posts', id].join('/'),

  // DELETE
  deletePostPath: (id) => [apiPath, 'posts', id].join('/'),

};