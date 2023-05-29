import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TabNavItem from "./TabNavItem"
import TabContent from "./TabContent";
import '../styles/TabsStyles.css'
import '../styles/ScrollbarStyles.css'

import PostForm from '../components/PostForm';
import UserListItem from "./UserlistItem";
import { logout } from "../redux/authSlice";
import EditProfile from "./allTabs/EditProfile";
import Post from "./Post";
import { getReportedPosts } from "../redux/postsSlice";

// import EventInFavourite from "../EventInFavourite";

const AdminProfile = ({ user }) => {
  const { usersPosts } = useSelector((state) => state.posts)
  const { usersMeta } = useSelector((state) => state.posts)
  const [editBoxOpen, setEditBoxOpen] = useState(false)
  const [form, openForm] = useState(null);
  const [curPage, setCurPage] = useState(1);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getReportedPosts())
    // dispatch(getUsersPosts(1))
  }, [dispatch])


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

  const triggerUpdate = () => {
    console.log('update trigger');
    setTimeout(() => {
      dispatch(getReportedPosts());
      // dispatch(getUsersPosts(1))
    }, 500);

  }

  return (
    <div className="flex flex-col bg-opacity-30 w-5/6 diagonal-gridlines glowbox-diagonales items-center text-center min-h-[400px] space-y-4 p-6">
      {
        editBoxOpen &&
        <EditProfile setEditBoxOpen={setEditBoxOpen} />
      }

      {!editBoxOpen && <div className="flex flex-col text-[2rem] items-center justify-center text-center min-h-[400px]">

        <div className="justify-center w-40 mt-5 ">
          <img alt={user.avatar} className="items-center rounded-[3rem]"
            src={`http://localhost:8080/api/static/${user.avatar}`}
          />
        </div>

        {/* Full name */}
        <div className='glitch-box' >
                  <div data-text={user.login} className="text-[25px] glitch-text">{user.login}</div>
                </div>

        {/* Login */}
        <p className="text-xl glowtext" >{user.email}</p>


        <div className='w-fit'>
          <button
            //className="text-[16px] mt-5 flex  cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            className="button btn-cyber-punk mt-5"
            type='submit'
            onClick={() => { setEditBoxOpen(true) }}>
            {/* <img className="w-6" src='editing_icon.png' alt='edit info' /> */}
            Edit profile
          </button>
        </div>

      </div>}



      <div className='flex flex-col w-2/3 justify-center items-center'>

        {usersPosts && usersPosts?.map((post, i) => {
          return (
            <Post data={post.reportedPost} iter={i} openForm={() => { }} triggerUpdate={triggerUpdate} />
          )
        })}
        {usersMeta && usersMeta?.totalPages !== 1 ?
          <div >
            <ul class="inline-flex -space-x-px">
              {getPageCount(usersMeta?.totalPages)}
            </ul>
          </div> : ''
        }
      </div>
    </div >
  );
};
export default AdminProfile;