import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TabNavItem from "../TabNavItem"
import TabContent from "../TabContent";
import '../../styles/TabsStyles.css'
import '../../styles/ScrollbarStyles.css'

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import CompanyListItem from "../CompanyListItem";

// import { updateUserData, uploadUserAvatar, deleteUser } from "../../redux/userSlice"
import { logout } from "../../redux/authSlice";

// import EventInFavourite from "../EventInFavourite";

const ProfileTab = () => {
  const [activeTabCompanies, setActiveTabCompanies] = useState("following_companies")
  const [editBoxOpen, setEditBoxOpen] = useState(false)
  const [updateImage, setUpdateImage] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  //   const userFavourites = useSelector(state => state.auth.user.subscriptions_events);

  const arrayItemsCount = (array) => {
    if (array) {
      return array.length
    } else {
      return '0'
    }
  }

  const [state, setState] = useState({
    login: user.login,
    password: '',
    oldPassword: '',
    email: user.email,
  })

  //Part for EditBlock
  //---------------------------------------------------------------------
  const { status } = useSelector((state) => state.user)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [newImage, setNewImage] = useState(null)
  const [emailColorBg, setEmailColorBg] = useState('gray-400')
  const [loginColorBg, setLoginColorBg] = useState('gray-400')
  const [passwordColorBg, setPasswordColorBg] = useState('gray-400')

  const submitHandler = () => {
    try {

      if (state.login === '' || state.email === '' || state.oldPassword === '') {
        console.log("Fill all required fields")
        return
      }

      if (!state.email.includes('@')) {
        setEmailColorBg('red-500')
        console.log("Uncorrect email")
        return
      }

      if (state.password !== '') {
        if (confirmPassword === '') {
          console.log("Please, repeat new password for confirmation")
          return
        }
        if (state.password !== confirmPassword) {
          console.log("New password and its confirmation are different. Please, try again.")
          setState(prevState => ({
            ...prevState,
            password: ''
          }))
          setConfirmPassword('')
          return
        }
      }
      console.log(state)


      dispatch(updateUserData({ ...state }))

      if (status && !user) {
        console.log(status)
        return
      }
      setEditBoxOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const onClickBut = () => {
    let data = new FormData()
    data.append('files', newImage)
    console.log(data)
    dispatch(uploadUserAvatar(data))
    setNewImage(null)
    setUpdateImage(false)
  }

  const onClickCancelImage = () => {
    setNewImage(null)
    setUpdateImage(false)
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'login': {
        if (value === '') {
          setLoginColorBg('red-500')
        } else {
          setLoginColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
        break;
      }
      case 'email': {
        if (value === '' || !value.includes('@')) {
          setEmailColorBg('red-500')
        } else {
          setEmailColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
        break;
      }
      case 'oldPassword': {
        if (value === '') {
          setPasswordColorBg('red-500')
        } else {
          setPasswordColorBg('gray-400')
        }
        setState(prevState => ({
          ...prevState,
          'oldPassword': value,
          errMessage: ''
        }));
        break;
      }
      default: {
        setState(prevState => ({
          ...prevState,
          [name]: value,
          errMessage: ''
        }));
      }
    }
  }

  const cancelHandler = () => {
    setState(({
      id: user.id,
      login: user.login,
      password: '',
      oldPassword: '',
      email: user.email,
    }))
    setEditBoxOpen(false)
  }

  //----------------------------------------------------------------------------------------------

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleClickDeleteUser = () => {
    dispatch(deleteUser())
    setOpenDialog(false);
    dispatch(logout())
    navigate('/')
  };


  return (
    <div className="flex flex-col bg-opacity-30 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
      <div className="flex flex-row space-x-4 w-full">

        <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

          {!updateImage && <>
            <div className="justify-center w-40 mt-5 ">
              <img alt={user.avatar} className="items-center rounded-[3rem]"
                src={'https://th.bing.com/th/id/R.acc466d998c5886cfe9aa20269f10f86?rik=N0PrszZQEG%2bdlQ&riu=http%3a%2f%2fferma-nasele.ru%2fwp-content%2fuploads%2f2017%2f06%2f10-67.jpg&ehk=cw4aW5EoyrkmdvXrVdhhZWrqjZWRrwIXhXxxQcJzIlo%3d&risl=&pid=ImgRaw&r=0'}
              />
            </div>
            <div
              className="text-[12px] mt-2 mb-8  cursor-pointer flex flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
              onClick={() => { setUpdateImage(true) }}>
              <img className="w-4" src='editing_icon.png' alt='edit info' />
              Change avatar
            </div>
          </>

          }
          {
            updateImage && <div className="rounded-3xl bg-dark-purple w-3/4 h-fit">
              <div className="p-4 pb-2 items-start justify-start">
                <button
                  onClick={onClickCancelImage}
                  className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                  Cancel
                </button>
              </div>

              <div className="flex flex-col p-4 justify-center items-center">
                <label
                  className="text-gray-300 w-full py-2 px-6 bg-gray-600 text-xs flex items-center justify-center border-2 border-dotted cursor-pointer">
                  Add image
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => { setNewImage(e.target.files[0]) }}
                  />
                </label>
                <div className="flex object-cover py-2">
                  {!newImage &&
                    <img className='w-40' src={`http://localhost:3002/${user.avatar}`} alt={user.avatar} />
                  }
                  {newImage &&
                    <img className='w-40' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                  }
                </div>
                <button
                  onClick={onClickBut}
                  className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                  Save
                </button>
              </div>

            </div>
          }


          {/* Full name */}
          <div className="text-[25px]">Full name</div>

          {/* Login */}
          <p className="text-xl" >{user.login}</p>


          <div
            className="text-[16px] mt-5 flex  cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
            onClick={() => { setEditBoxOpen(true) }}>
            <img className="w-6" src='editing_icon.png' alt='edit info' />
            Edit profile
          </div>
        </div>


        <div className="w-1/2 ">

          <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
            {
              editBoxOpen &&
              <div className="bg-dark-purple w-full rounded-3xl">
                <img
                  src='http://localhost:3000/back_icon_beige.png'
                  alt=''
                  onClick={cancelHandler}
                  className="justify-center cursor-pointer absolute items-center w-24 rounded-sm py-2 px-4">
                </img>
                <form
                  className="w-1/2 mx-auto pb-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="text-sm text-beige">
                    Username (login) <span className="text-2xl text-red-500"> *</span>
                    <input type="text"
                      placeholder="Username"
                      value={state.login}
                      name='username'
                      onChange={changeHandler}

                      className={`text-black w-full rounded-lg bg-${loginColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                  </label>

                  <label className="mb-0 text-sm text-beige">
                    Email <span className="text-red-500 text-2xl"> *</span>
                    <input type="email"
                      placeholder="email"
                      name='email'
                      value={state.email}

                      onChange={changeHandler}
                      className={`text-black w-full rounded-lg bg-${emailColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`} />
                  </label>

                  <label className="text-sm text-beige">
                    Full name
                    <input type="text"
                      placeholder="Fullname"
                      name='full_name'
                      // value={state.full_name}
                      // onChange={changeHandler}
                      className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                  </label>

                  {/* <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                    <div className="text-[18px] uppercase">social nets</div>

                    <label className="text-sm text-beige">
                      facebook
                      <input type="text"
                        placeholder="link to your facebook"
                        name='facebook'
                        value={socialNet?.facebook}
                        onChange={changeHandler}
                        className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                    </label>
                    <label className="text-sm text-beige">
                      instagram
                      <input type="text"
                        placeholder="link to your instagram"
                        name='instagram'
                        value={socialNet?.instagram}
                        onChange={changeHandler}
                        className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                    </label>
                    <label className="text-sm text-beige">
                      whatsapp
                      <input type="text"
                        placeholder="link to your whatsapp"
                        name='whatsapp'
                        value={socialNet?.whatsapp}
                        onChange={changeHandler}
                        className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                    </label>
                    <label className="text-sm text-beige">
                      telegram
                      <input type="text"
                        placeholder="link to your telegram"
                        name='telegram'
                        value={socialNet?.telegram}
                        onChange={changeHandler}
                        className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                    </label>
                    <label className="text-sm text-beige">
                      viber
                      <input type="text"
                        placeholder="link to your viber"
                        name='viber'
                        value={socialNet?.viber}
                        onChange={changeHandler}
                        className="text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none placeholder:text-gray-700" />
                    </label>
                  </div> */}

                  <div className="rounded-2xl border-[2px] border-beige bg-lilovii bg-opacity-50 mt-8 mb-6 p-4">
                    <div className="text-[18px] uppercase">Change password</div>

                    <label className="text-xs text-gray-400">
                      New password
                      <input
                        type="password"
                        value={state.password}
                        name='password'
                        onChange={changeHandler}
                        placeholder="new password"
                        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                      />
                    </label>
                    <label className="text-xs text-gray-400">
                      Confirm new password
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="repeat new password"
                        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                      />
                    </label>
                  </div>
                  <label className="text-sm text-beige mt-6">
                    Current password <span className="text-2xl text-red-700"> *</span>
                    <input
                      type="password"
                      value={state.oldPassword}
                      name='oldPassword'
                      onChange={changeHandler}
                      placeholder="current password"
                      className={` text-black w-full rounded-lg bg-${passwordColorBg} border py-1 px-2 text-xs outline-none placeholder:text-gray-700`}
                    />
                  </label>

                  <div className="flex gap-8 items-center justify-center mt-4">
                    <button
                      onClick={submitHandler}
                      className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                      Save changes
                    </button>
                    <button
                      onClick={cancelHandler}
                      className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            }

            {!editBoxOpen && <>
              <ul className="Horizontalnav">
                <TabNavItem title={`followed companies`} id="following_companies" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
                <TabNavItem title={`followed events`} id="followed_events" activeTab={activeTabCompanies} setActiveTab={setActiveTabCompanies} />
              </ul>

              <div>
                <TabContent id="following_companies" activeTab={activeTabCompanies}>
                 
                    <div className="text-beige m-auto text-md h-full w-full">
                      You don't follow any company yet...
                    </div>
                  {/* {user.subscriptions_companies.length > 0 &&
                    <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                      {
                        user?.subscriptions_companies.map((company, index) => (
                          <CompanyListItem
                            key={index}
                            company={company} />
                        ))}
                    </ul>
                  } */}

                </TabContent>
                <TabContent id="followed_events" activeTab={activeTabCompanies}>
                  <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
                    <div className="border-0 shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none ">

                      {/*body*/}
                      {/* <div className="relative p-5 flex flex-col overflow-y-auto h-fit">
                        {userFavourites && userFavourites.map(fav_event => {
                          return (
                            <EventInFavourite key={fav_event._id} data={fav_event} userFavourites={userFavourites} />
                          )
                        })}
                        {userFavourites.length <= 0 && <div className='text-light-beige text-xl h-full w-full flex justify-center'>Nothing to see here ...</div>}
                      </div> */}
                    </div>
                  </ul>
                </TabContent>
              </div>
            </>}
          </div>

          <div className="rounded-3xl cursor-pointer hover:bg-red-900 px-2 py-1 mt-4 h-fit text-[18px] bg-red-800 text-beige"
            onClick={handleClickOpen} >Delete account</div>
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
    </div >
  );
};
export default ProfileTab;