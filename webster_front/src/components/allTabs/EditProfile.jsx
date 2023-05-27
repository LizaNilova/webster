import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import '../../styles/TabsStyles.css'
import '../../styles/ScrollbarStyles.css'

// import { updateUserData, uploadUserAvatar, deleteUser } from "../../redux/userSlice"

const EditProfile = ({ setEditBoxOpen }) => {
    const [updateImage, setUpdateImage] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)

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

            if (newImage) {
                let data = new FormData()
                data.append('avatar', newImage)
                data.append('login', state.login)
                data.append('email', state.email)
                data.append('password', state.password)
                data.append('passwordConfirm', confirmPassword)
                data.append('oldPassword', state.oldPassword)
                console.log(data)

                dispatch(updateUserData(data))

                setNewImage(null)
            } else {
                const data = {
                    login: state.login,
                    email: state.email,
                    password: state.password,
                    passwordConfirm: confirmPassword,
                    oldPassword: state.oldPassword
                }
                dispatch(updateUserData(data))

            }

            if (status && !user) {
                console.log(status)
                return
            }
            setEditBoxOpen(false)
        } catch (error) {
            console.log(error)
        }
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
        setNewImage(null)
        setEditBoxOpen(false)
    }

    //----------------------------------------------------------------------------------------------

    return (
        <div>
            <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
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
                                        <img className='w-40' src={`http://localhost:8080/${user.avatar}`} alt={user.avatar} />
                                    }
                                    {newImage &&
                                        <img className='w-40' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                                    }
                                </div>
                            </div>

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
            </div>
        </div>
    );
};
export default EditProfile;