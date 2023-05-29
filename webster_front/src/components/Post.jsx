import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, createCommentPost, deletePost } from '../redux/postsSlice';
import { banPost } from '../redux/postsSlice';
import '../styles/PostStyle.scss';
import ConfirmForm from './ConfirmForm';

const apiPath = 'http://localhost:8080/api';

const Post = ({ data, openForm, triggerUpdate, iter }) => {
  const userID = useSelector((state) => state.user.user.id);
  const userRole = useSelector((state) => state.user.user.role);
  // console.log(userRole)
  const dispatch = useDispatch();
  const [isLike, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(data.likes.length);
  const [curPage, setCurPage] = useState(1);
  const [isHidden, setHidden] = useState(true);
  const [commentText, setCommentText] = useState('');

  const [cofirmForm, openConfirm] = useState(false);

  const parsedPage = curPage;
  const perPage = 5;
  const totalPages = Math.ceil(data.comments.length / perPage);
  const commentSlice = data.comments.slice(
    parsedPage * perPage - perPage,
    parsedPage * perPage
  );

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

  const handleClick = () => {
    try {
      setLike(!isLike);
      dispatch(likePost({ id: data.id }));
      if (!isLike) {
        setCountLikes(countLikes + 1);
      } else {
        setCountLikes(countLikes - 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleForm = (e) => {
    try {
      e.preventDefault();
      dispatch(createCommentPost({ id: data.id, value: commentText }));
      triggerUpdate();
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    console.log(data);
    const isLikeUser = data.likes.find((like) => {
      return like.userId === userID;
    });
    if (isLikeUser) {
      setLike(!isLike);
    }
  }, []);

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

  return (
    <div
      className={`w-5/6 glow ${color[iter]} flex flex-col justify-center items-center m-2 p-2 rounded-xl`}
    >
      {cofirmForm && (
        <ConfirmForm
          closeForm={() => {
            openConfirm(false);
          }}
          confirmAction={() => {
            // console.log(data.id);
            dispatch(deletePost(data.id));
            triggerUpdate();
            openConfirm(false);
          }}
          action="Delete post"
        />
      )}
      <div className="w-full flex px-4 p-1 justify-between">
        <div className="w-1/3 flex">
          <div>
            <img src="папич.jfif" className="w-14 h-14 rounded-full" />
          </div>
          <div className="ml-7 flex flex-col items-center justify-center">
            <div className="text-lg text glow">{data.author.login}</div>
            <div className="text-sm text glow">
              {new Date(data.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="w-2/4 text glow flex items-center text-2xl font-semibold justify-center">
          {data.title}
        </div>
        <div className="w-1/5 flex items-center justify-end">
          {userRole && userRole === 'ADMIN' && (
            <button
              onClick={() => {
                console.log('BAN');
                dispatch(banPost(data.id));
                triggerUpdate();
              }}
              className="ml-2 px-3 py-2 bg-purple-700 hover:bg-purple-600 text-pink-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </button>
          )}
          {data.author.id === userID && (
            <>
              <button
                onClick={() => {
                  openForm({ method: 'Update', data: data });
                }}
                className="px-3 py-2 glowbox green"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  openConfirm(true);
                }}
                className="ml-2 px-3 py-2 red glowbox-del"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </>
          )}
          <button
            onClick={() => {
              openForm({ method: 'Report', data: data });
            }}
            className="ml-2 px-3 py-2 glowbox-rep yellow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-6/7 text-sm text-justify mt-3 text glow">
        {data.content}
      </div>
      <div className="w-4/6 flex justify-center">
        <img
          src={apiPath + '/static/' + data.image}
          alt={data.image}
          className="max-w-full m-1 p-1 rounded-xl"
        />
      </div>
      {/*Likes, comments*/}
      <div className="w-full flex p-1 justify-around">
        <div className="p-1 mx-2 flex justify-center items-center cursor-pointer">
          {!isLike ? (
            <svg
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke={color[iter]}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ) : (
            <svg
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              fill={color[iter]}
              className="w-8 h-8"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          )}
          <div className="ml-1 text-lg font-semibold">{countLikes}</div>
        </div>
        <div className="p-1 mx-2 flex justify-center items-center cursor-pointer">
          <svg
            onClick={() => setHidden(!isHidden)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke={color[iter]}
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          <div className="ml-1 text-lg font-semibold">
            {data.comments.length}
          </div>
        </div>
        {/* <div className='p-1 mx-2 flex justify-center items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div className='ml-1'>1</div>
                </div> */}
      </div>
      <div
        className={`w-full pb-0 border p-5 border-purple-800 overflow-hidden ${
          isHidden ? 'h-0 p-0 border-none' : 'h-full glow'
        }`}
      >
        <form onSubmit={handleForm} class="mt-4">
          <div className="field block">
            <label for="comment" class="glow text">
              Comment
            </label>
            <textarea
              id="comment"
              cols="30"
              rows="3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type your comment..."
              class="px-3 py-2 border text-black rounded-md w-full block text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            class="mt-2 glow inline-flex items-center justify-center text-gray-100 font-medium leading-none
            rounded-md py-2 px-3 border border-transparent transform-gpu
            ease-in duration-300 text-sm"
          >
            <p className="glow text">Post comment</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-2 rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        <div class="my-4">
          <small class="text-base font-bold text-white ml-1 glow text">
            {data.comments.length} comments
          </small>
          {commentSlice.map((comment) => {
            const date = new Date(comment.createdAt).toDateString();
            const time = new Date(comment.createdAt).toLocaleTimeString();
            return (
              <div class="flex glow flex-col mt-4">
                <div class="flex flex-row justify-between px-1 py-1">
                  <div class="flex mr-2">
                    <div class="items-center justify-center w-12 h-12 mx-auto">
                      <img
                        alt="profil"
                        src={`http://localhost:8080/api/static/${comment.author.avatar}`}
                        class="object-cover w-12 h-12 mx-auto rounded-full"
                      />
                    </div>
                  </div>
                  <div class="flex-1 pl-1">
                    <div class="text-base font-semibold text-white glow text">
                      {comment.author.login}
                      <span class="text-sm font-normal text-white glow text">
                        {' '}
                        - {`${date} ${time}`}
                      </span>
                    </div>
                    <div class="text-sm text-white glow text">
                      {comment.value}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {totalPages !== 1 ? (
            <div className="w-full text-center mt-5">
              <ul class="inline-flex -space-x-px">
                {getPageCount(totalPages)}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
