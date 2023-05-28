import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TabNavItem from "./TabNavItem"
import TabContent from "./TabContent";
import '../styles/TabsStyles.css'
import '../styles/ScrollbarStyles.css'

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import UserListItem from "./UserlistItem";

// import { updateUserData, uploadUserAvatar, deleteUser } from "../../redux/userSlice"
import { logout } from "../redux/authSlice";
import EditProfile from "./allTabs/EditProfile";
import Post from "./Post";

// import EventInFavourite from "../EventInFavourite";

const ProfileTab = () => {
  const [activeTab, setActiveTab] = useState("following")
  const [editBoxOpen, setEditBoxOpen] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { subscriptions } = useSelector((state) => state.user)
  const { subscribers } = useSelector((state) => state.user)
  const { usersPosts } = useSelector((state) => state.posts)
  const { usersMeta } = useSelector((state) => state.posts)
  //   const userFavourites = useSelector(state => state.auth.user.subscriptions_events);

  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }

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
    <div className="flex flex-col bg-opacity-30 w-2/3 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      <div className="flex flex-row space-x-4 w-full">
        {
          editBoxOpen &&
          <EditProfile setEditBoxOpen={setEditBoxOpen} />
        }

        {!editBoxOpen && <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

          <div className="justify-center w-40 mt-5 ">
            <img alt={user.avatar} className="items-center rounded-[3rem]"
              src={`http://localhost:8080/api/static/${user.avatar}`}
            />
          </div>

          {/* Full name */}
          <div className="text-[25px]">{user.login}</div>

          {/* Login */}
          <p className="text-xl" >{user.email}</p>


          <div
            className="text-[16px] mt-5 flex  cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={() => { setEditBoxOpen(true) }}>
            <img className="w-6" src='editing_icon.png' alt='edit info' />
            Edit profile
          </div>
        </div>}



        <div className="w-1/2 ">

          <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">

            {!editBoxOpen && <>
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
                    <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
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
                  <div className="text-beige m-auto text-md h-full w-full">
                    Nobody follows you yet...
                  </div>
                  {subscribers.length > 0 &&
                    <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
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
            </>}
          </div>

          <div className="rounded-3xl cursor-pointer hover:bg-red-900 px-2 py-1 mt-4 h-fit text-[18px] bg-red-800 text-beige"
          // onClick={handleClickOpen} 
          >Delete account</div>
          {/* <Dialog
            open={openDialog}
            onClose={handleClickCancelDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Deleting user"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete this account? You can`t turn your data back after
                confirmation deleting.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickCancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClickDeleteUser} color="primary" autoFocus>
                Delete account
              </Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </div>

      <div className='posts-page-posts-container'>
        {usersPosts && usersPosts.map((post, index) => {
          return (
            <Post data={post} key={index} openForm={() => { }} />
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
    </div >
  );
};
export default ProfileTab;