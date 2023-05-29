import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/postsSlice';
import PostForm from '../components/PostForm';
import { getAllCategories } from '../redux/categoriesSlice';
import '../styles/PostsPage.css';
import '../styles/StyleCheckbox.scss';
import ReportForm from '../components/reportForm';
import { getAllUsers } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/createPostStyle.scss'

const PostsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const meta = useSelector((state) => state.posts.meta);
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.allUsers);
  console.log(users);

  const categories = useSelector((state) => state.categories.categories);

  const [form, openForm] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [filter, setFilter] = useState([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    console.log('filters:', filter);
    dispatch(
      getAllPosts({
        sort: sort,
        filter: JSON.stringify(filter),
        search: search,
        page: curPage,
      })
    );
    dispatch(getAllCategories());
    dispatch(getAllUsers());
  }, [dispatch, search, sort, filter, curPage]);

  const getPageCount = (count) => {
    const result = [];
    for (let i = 1; i <= count; i += 1) {
      result.push(
        <li key={i} className="glow">
          <button
            onClick={() => setCurPage(i)}
            className="px-3 py-2 rounded-none"
            style={{
              animation:
                i !== curPage ? '' : '0.8s ease-out infinite alternate glowing',
              background: i !== curPage ? 'transparent' : 'var(--color)',
              transform: i !== curPage ? '' : 'scale(1) rotateZ(var(--skew))',
              transition:
                i !== curPage ? '' : 'transform 0.05s ease, opacity 0.15s ease',
              opacity: i !== curPage ? '' : '1',
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return result;
  };

  const triggerUpdate = () => {
    console.log('update trigger');
    setTimeout(() => {
      dispatch(
        getAllPosts({
          sort: sort,
          filter: JSON.stringify(filter),
          search: search,
          page: curPage,
        })
      );
    }, 500);
  };

  // console.log(categories)

  return (
    <>
      {form && form.method !== 'Report' && (
        <PostForm
          data={form.data}
          closeForm={() => {
            openForm(null);
            triggerUpdate();
          }}
        />
      )}
      {form && form.method === 'Report' && (
        <ReportForm
          data={form.data}
          closeForm={() => {
            openForm(null);
          }}
        />
      )}
      <div className="posts-page-container">
        <div className="posts-page-filters-container">
          {user?.role !== 'ADMIN' && (
            <button
              onClick={() => {
                openForm('Create');
              }}
              className="posts-page-filters-button purple transition"
            >
              Create
            </button>
          )}
          {/* <div className=""></div> */}
          <div className="w-full m-1 flex flex-col field purple">
            <label
              htmlFor="search"
              className="text-center text-xl mb-3 glow text"
            >
              Search post:
            </label>
            <input
              id="search"
              autoComplete="off"
              type="text"
              name="search"
              className="w-full text-base p-3 rounded-lg outline-none"
              placeholder="Input name of post ..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="posts-page-filters-header glow text purple">
            Filters by categories:
          </div>
          <div className="posts-page-filters-categories-container">
            <ul className="flex flex-wrap justify-between">
            {categories &&
              categories.map((category, i) => {
                // console.log(filter.findIndex(f_category => f_category === category.value))
                return (
                      <li class="checkbox ">
                        <input
                          class="checkbox-flip"
                          type="checkbox"
                          id={`check${i}`}
                          defaultChecked={
                            !Boolean(
                              filter.findIndex(
                                (f_category) => f_category === category
                              )
                            )
                          }
                          onChange={(e) => {
                            let idx = filter.findIndex(
                              (f_category) => f_category === category
                            );
                            if (idx < 0) {
                              let new_filters = [...filter];
                              new_filters.push(category);
                              setFilter(new_filters);
                            } else {
                              let new_filters = [...filter];
                              new_filters.splice(idx, 1);
                              setFilter(new_filters);
                            }
                          }}
                        />
                        <label htmlFor={`check${i}`} className='glow text'>
                          <span></span>
                          {category}
                        </label>
                      </li>
                      );
                    })}
                    </ul>
          </div>
          <div className="posts-page-filters-header glow text">Sort by:</div>
          <div className="posts-page-filters-select-container">
            <select
              className="posts-page-filters-select text-white purple"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="date" className="glow text">
                Date
              </option>
              <option value="byCategories">Categories</option>
            </select>
          </div>
        </div>
        {/*container*/}
        <div className="posts-page-posts-container">
          <div className="w-full min-h-screen flex flex-col items-center">
            {posts &&
              posts.map((post, i) => {
                return (
                  <Post
                    iter={i}
                    data={post}
                    openForm={openForm}
                    triggerUpdate={triggerUpdate}
                  />
                );
              })}
          </div>
          {meta.totalPages !== 1 ? (
            <div className={(meta.totalPages === curPage && posts.length < 2) ? 'sticky bottom-3' : ''}>
              <ul class="inline-flex -space-x-px">
                {getPageCount(meta.totalPages)}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="posts-page-users-container">
          <div className="posts-page-users-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <div className="posts-page-users-title glow text">User tier list</div>
          <div className="posts-page-users-subcontainer">
            {users.user &&
              users?.user?.map((user) => {
                if (users.user[0] === user) {
                  return (
                    <button
                      className="posts-page-users-user-card bg-emerald-400"
                      onClick={() => {
                        navigate(`/users/${user.id}`);
                      }}
                    >
                      <div className="posts-page-users-user-nickname glow text">
                        {user.login}
                      </div>
                      <div className="posts-page-users-user-count">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        {user.rating}
                      </div>
                    </button>
                  );
                } else if (users.user[1] == user) {
                  return (
                    <button
                      className="posts-page-users-user-card bg-emerald-500"
                      onClick={() => {
                        navigate(`/users/${user.id}`);
                      }}
                    >
                      <div className="posts-page-users-user-nickname glow text">
                        {user.login}
                      </div>
                      <div className="posts-page-users-user-count">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        {user.rating}
                      </div>
                    </button>
                  );
                } else if (users.user[2] == user) {
                  return (
                    <button
                      className="posts-page-users-user-card bg-emerald-600 glow text"
                      onClick={() => {
                        navigate(`/users/${user.id}`);
                      }}
                    >
                      <div className="posts-page-users-user-nickname">
                        {user.login}
                      </div>
                      <div className="posts-page-users-user-count">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        {user.rating}
                      </div>
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="posts-page-users-user-card bg-emerald-800"
                      onClick={() => {
                        navigate(`/users/${user.id}`);
                      }}
                    >
                      <div className="posts-page-users-user-nickname glow text">
                        {user.login}
                      </div>
                      <div className="posts-page-users-user-count">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        {user.rating}
                      </div>
                    </button>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsPage;
