import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TabNavItem from "./TabNavItem"
import TabContent from "./TabContent";
import '../styles/TabsStyles.css'
// import '../styles/ScrollbarStyles.css'
import '../styles/profile.scss'

import PostForm from '../components/PostForm';
import UserListItem from "./UserlistItem";
import { logout } from "../redux/authSlice";
import EditProfile from "./allTabs/EditProfile";
import Post from "./Post";
import { getMyPosts } from "../redux/postsSlice";
import AdminProfile from "./AdminProfile";
import ConfirmForm from "./ConfirmForm";
import { deleteUser } from "../redux/userSlice";

// import EventInFavourite from "../EventInFavourite";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("following")
  const [editBoxOpen, setEditBoxOpen] = useState(false)
  const [form, openForm] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [cofirmForm, openConfirm] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { subscriptions } = useSelector((state) => state.user)
  const { subscribers } = useSelector((state) => state.user)
  const { usersPosts } = useSelector((state) => state.posts)
  const { usersMeta } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getMyPosts())
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
      dispatch(getMyPosts());
    }, 500);

  }

  // const handleClickCancelDelete = () => {
  //   setOpenDialog(false);
  // };

  // const handleClickDeleteUser = () => {
  //   dispatch(deleteUser())
  //   setOpenDialog(false);
  //   dispatch(logout())
  //   navigate('/')
  // };

  return (
    <>
      {user.role === 'ADMIN' &&
        <AdminProfile user={user} />
      }
      {user.role !== 'ADMIN' && <>
        {
          editBoxOpen &&
          <EditProfile setEditBoxOpen={setEditBoxOpen} />
        }
        {!editBoxOpen && <>
          <div className="flex flex-col bg-opacity-30 w-5/6 diagonal-gridlines glowbox-diagonales items-center text-center min-h-[400px] space-y-4 p-6">

            <div className="flex flex-row space-x-4 w-2/3">
              <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

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

              </div>
              <div className="w-1/2 ">

                <div
                  // className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl"
                  className="profile-card glowbox"
                >
                  <ul className="Horizontalnav">
                    <TabNavItem title={`following`} id="following" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabNavItem title={`followers`} id="followers" activeTab={activeTab} setActiveTab={setActiveTab} />
                  </ul>

                  <div>
                    <TabContent id="following" activeTab={activeTab}>

                      {!subscriptions && <div className="text-beige m-auto text-md h-full w-full">
                        You don't follow any user yet...
                      </div>}
                      {subscriptions.length > 0 &&
                        <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[250px]">
                          {
                            subscriptions.map((user, index) => (
                              <UserListItem
                                key={index}
                                user={user} />
                            ))}
                        </ul>
                      }

                    </TabContent>
                    <TabContent id="followers" activeTab={activeTab}>
                      {!subscribers &&
                        <div className="text-beige m-auto text-md h-full w-full">
                          Nobody follows you yet...
                        </div>}

                      {subscribers.length > 0 &&
                        <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[250px]">
                          {
                            subscribers.map((user, index) => (
                              <UserListItem
                                key={index}
                                user={user} />
                            ))}
                        </ul>
                      }
                    </TabContent>
                  </div>
                  <button className="glowbox-del red text-white w-full cursor-pointer px-2 py-1 mt-4 h-fit text-[18px]"
                    onClick={() => { console.log(user.id); openConfirm(true); }}
                  >Delete account</button>
                </div>

              </div>

            </div>
            <div className='flex flex-col w-full justify-center items-center'>
              {cofirmForm && <ConfirmForm closeForm={() => { openConfirm(false); }} confirmAction={() => {
                dispatch(deleteUser());
                setTimeout(() => {
                  dispatch(logout());
                  setTimeout(() => {
                    navigate('/');
                    openConfirm(false);
                    location.reload();
                  }, 500);
                }, 1000);
              }} action={'Deleting account'} />}
              {form && <PostForm data={form} closeForm={() => { openForm(null); triggerUpdate() }} />}
              {usersPosts && usersPosts.map((post, index) => {
                return (
                  <Post iter={index} data={post} key={index} openForm={openForm} triggerUpdate={triggerUpdate} />
                )
              })}
              {usersMeta && usersMeta.totalPages !== 1 ?
                <div >
                  <ul class="inline-flex -space-x-px">
                    {getPageCount(usersMeta.totalPages)}
                  </ul>
                </div> : ''
              }
            </div>


          </div>
        </>
        }
      </>}
    </>
  );
};
export default ProfileTab;