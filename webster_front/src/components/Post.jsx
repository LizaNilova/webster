import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../redux/postsSlice';
import { getUserById } from '../redux/userSlice';

const apiPath = 'http://localhost:8080/api';

const Post = ({ data, openForm }) => {
  const userID = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();
  const [isLike, setLike] = React.useState(false);
  const [countLikes, setCountLikes] = React.useState(data.likes.length);
  const [curPage, setCurPage] = React.useState(1);
  const [isHidden, setHidden] = React.useState(true);
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
            <li key={i}>
                <button
                    onClick={() => setCurPage(i)}
                    className={`px-3 py-2 border border-gray-600 rounded-none ${i === curPage ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
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
  React.useEffect(() => {
    console.log(data);
    const isLikeUser = data.likes.find((like) => {
      return like.userId === userID;
    });
    if (isLikeUser) {
      setLike(!isLike);
    }
  }, []);
  return (
    <div className="w-5/6 flex flex-col justify-center items-center border-purple-800 border m-2 p-2 rounded-xl">
      <div className="w-full flex px-4 p-1 justify-between">
        <div className="w-1/3 flex">
          <div>
            <img src="папич.jfif" className="w-14 h-14 rounded-full" />
          </div>
          <div className="ml-7 flex flex-col items-center justify-center">
            <div className="text-lg">{data.author.login}</div>
            <div className="text-sm">
              {new Date(data.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="w-2/4 flex items-center text-2xl font-semibold justify-center">
          {data.title}
        </div>
        <div className="w-1/5 flex items-center justify-end">
          {data.author.id === userID && (
            <button
              onClick={() => {
                openForm(data);
              }}
              className="px-3 py-2 bg-purple-700 hover:bg-purple-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="w-6/7 text-sm text-justify mt-3">{data.content}</div>
      <div className="w-5/6 flex justify-center">
        <img
          src={apiPath + '/static/' + data.image}
          alt="kal"
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
              stroke="currentColor"
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
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          )}
          <div className="ml-1">{countLikes}</div>
        </div>
        <div className="p-1 mx-2 flex justify-center items-center cursor-pointer">
          <svg
          onClick={() => setHidden(!isHidden)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          <div className="ml-1">{data.comments.length}</div>
        </div>
        {/* <div className='p-1 mx-2 flex justify-center items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div className='ml-1'>1</div>
                </div> */}
      </div>
      <div className={`w-full pb-0 border p-5 border-purple-800 overflow-hidden ${isHidden ? 'h-0 p-0 border-none' : 'h-full'}`}>
        <form action="#" class="mt-4">
          <label for="comment" class="block ">
            <textarea
              id="comment"
              cols="30"
              rows="3"
              placeholder="Type your comment..."
              class="px-3 py-2 border shadow-sm border-gray-300 rounded-md w-full block placeholder:text-gray-400 placeholder-gray-500
                    focus:outline-none focus:ring-1 bg-gray-50 focus:ring-blue-600 focus:border-blue-600 text-sm"
            ></textarea>
          </label>
          <button
            type="button"
            class="mt-2  inline-flex items-center justify-center text-gray-100 font-medium leading-none
                                    bg-blue-600 rounded-md py-2 px-3 border border-transparent transform-gpu hover:-translate-y-0.5 
                                    transition-all ease-in duration-300 hover:text-gray-200 hover:bg-blue-700 text-sm"
          >
            Post comment
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
          <small class="text-base font-bold text-white ml-1">
            {data.comments.length} comments
          </small>
          {commentSlice.map((comment) => (
            <div class="flex flex-col mt-4">
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
                  <div class="text-base font-semibold text-white">
                    {comment.author.login}
                    <span class="text-sm font-normal text-white">
                      {' '}
                      - {new Date(comment.createdAt).toDateString()}
                    </span>
                  </div>
                  <div class="text-sm text-white">{comment.value}</div>
                </div>
              </div>
            </div>
          ))}
          {totalPages !== 1 ? (
            <div className='w-full text-center mt-5'>
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
