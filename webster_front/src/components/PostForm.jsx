import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../redux/CanvasSlice';
import { getAllCategories } from '../redux/categoriesSlice';
import axios from 'axios';
import { dataURItoBlob } from '../functions/toBlob';
import { createPost, getAllPosts, updatePost } from '../redux/postsSlice';
import '../styles/styleCheckbox.scss'
import '../styles/glitch.scss'
const apiPath = 'http://localhost:8080/api';

const PostForm = ({ method, data, closeForm }) => {
  console.log(method, data);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.canvas.projects);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllCategories());
  }, [dispatch]);

  const [state, setState] = useState({
    title: data?.title || '',
    content: data?.content || '',
    image: data?.image || '',
    categories: data?.categories || [],
  });

  const color = [
    'purple',
    'yellow',
    'blue',
    'red',
    'green',
    'purple',
    'yellow',
    'blue',
    'red',
    'green',
  ];

  const handleUpdateOrCreateClick = () => {
    if (method === 'Create') {
      console.log(state);
      axios
        .get(apiPath + '/static/' + state.image, { responseType: 'blob' })
        .then((response) => {
          console.log(
            'Title:',
            state.title,
            'Content:',
            state.content,
            'image:',
            response.data,
            'categories:',
            state.categories
          );
          let fd = new FormData();
          fd.append('title', state.title);
          fd.append('content', state.content);
          fd.append('image', response.data);
          state.categories.forEach((item, i) => {
            fd.append(`category_value[${i}]`, item);
            return;
          });
          // fd.append('category_value', );
          dispatch(createPost(fd));
          // dispatch(getAllPosts({sort: sort, filter: JSON.stringify(filter), search: search, page: curPage}));
          closeForm();
        });
    } else {
      console.log(
        'Title:',
        state.title,
        'Content:',
        state.content,
        'image:',
        state.image,
        'categories:',
        state.categories
      );
      axios
        .get(apiPath + '/static/' + state.image, { responseType: 'blob' })
        .then((response) => {
          console.log(
            'Title:',
            state.title,
            'Content:',
            state.content,
            'image:',
            response.data,
            'categories:',
            state.categories
          );
          let fd = new FormData();
          fd.append('title', state.title);
          fd.append('content', state.content);
          fd.append('image', response.data);
          state.categories.forEach((item, i) => {
            fd.append(`category_value[${i}]`, item);
            return;
          });
          // fd.append('category_value', );
          dispatch(updatePost({ id: data.id, formData: fd }));
          // dispatch(getAllPosts({sort: sort, filter: JSON.stringify(filter), search: search, page: curPage}));
          closeForm();
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="form-background">
      <div className="form-container">
        {/*content*/}
        <div className="form-content-container">
          {/*header*/}
          <div className="form-header-container">
            <div className="glitch-box">
                    <h3 className="glitch-text" data-text='Post creation\edit'>Post creation\edit</h3>
                </div>
            <button
              className="p-1 red ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/*body*/}
          <div className="form-body-container">
            <div className="w-full field purple form-body-item-container">
              <label className="text-start glow text purple w-1/4">Title of the post:</label>
              <input
                type={'text'}
                className="w-2/3 rounded-full outline-none p-2 text-white"
                name="title"
                onChange={handleChange}
                placeholder="Title of the post ... "
                defaultValue={state.title}
              />
            </div>
            <div className="w-full field purple form-body-item-container">
              <label className="text-start glow text purple w-1/4">Text description:</label>
              <textarea
                className="w-2/3 rounded-lg outline-none p-2 text-white"
                name="content"
                onChange={handleChange}
                placeholder="Post description ... "
                defaultValue={state.content}
              />
            </div>
            <div className="w-full form-body-item-container">
              <label className="text-start text-white glow text purple w-1/4">
                Choose your work to post:
              </label>
              <div className="w-2/3 flex flex-wrap justify-between">
                {projects.map((project, i) => {
                  return (
                    <button
                    className={
                        state.image === project.image
                          ? `w-1/4 h-32 mx-2 my-1.5 rounded-lg cursor-pointer border-4 border-emerald-600 bg-inherit ${color[i]}`
                          : `w-1/4 h-32 mx-2 my-1.5 rounded-lg cursor-pointer bg-inherit ${color[i]}`
                      }
                    onClick={() => {
                        
                        setState((prevState) => ({
                          ...prevState,
                          image: project.image,
                        }));
                      }}
                    >
                    <img
                      src={apiPath + '/static/' + project.image}
                      className='w-full h-full'
                    />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex flex-col items-start form-body-item-container">
              <div className="pb-1 glow text purple my-1 flex items-center w-1/2 text-xl text-beige">
                Choose categories:
              </div>
              <ul className="w-full flex flex-wrap justify-between m-1">
                {categories &&
                  categories.map((category, i) => {
                    return (
                        <li class="checkbox">
                        <input
                          class="checkbox-flip"
                          type="checkbox"
                          id={`check${i}`}
                          defaultChecked={
                            state.categories.findIndex(
                              (f_category) => f_category === category
                            ) >= 0
                          }
                          onChange={(e) => {
                            // console.log(e.target.checked)
                            // console.log(state)
                            let idx = state.categories.findIndex(
                              (f_category) => f_category === category
                            );
                            if (idx < 0) {
                              let new_categories = [...state.categories];
                              new_categories.push(category);
                              setState((prevState) => ({
                                ...prevState,
                                categories: new_categories,
                              }));
                            } else {
                              let new_categories = [...state.categories];
                              new_categories.splice(idx, 1);
                              setState((prevState) => ({
                                ...prevState,
                                categories: new_categories,
                              }));
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

            {/* <div className='pb-1 my-1 flex items-center w-full text-xl text-beige'>
                            <label className='text-center w-1/4'>Comments:</label>
                            <input type='checkbox' className='ml-6 w-6 h-6' onChange={(e) => {
                                setState(prevState => ({
                                    ...prevState,
                                    c: new_categories,
                                }))
                            }} />
                        </div> */}

            <div className="form-error-message">{state.errMessage}</div>
          </div>
          {/*footer*/}
          <div className="form-footer-container">
            <button
              className="text-pink-700 red hover:text-white background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-350"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              className="bg-emerald-600 green text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
              type="button"
              onClick={handleUpdateOrCreateClick}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
