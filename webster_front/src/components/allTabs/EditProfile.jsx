import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../../styles/TabsStyles.css'
import '../../styles/ScrollbarStyles.css'

import { updateUserData } from "../../redux/userSlice"

const EditProfile = ({ setEditBoxOpen }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    const [state, setState] = useState({
        login: user.login,
        password: '',
        oldPassword: '',
        email: user.email,
    })

    const { status } = useSelector((state) => state.user)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [newImage, setNewImage] = useState(null)

    const submitHandler = () => {
        try {

            if (state.login === '' || state.email === '' || state.oldPassword === '') {
                console.log("Fill all required fields")
                return
            }

            if (!state.email.includes('@')) {
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
            let data = new FormData()
            if (newImage) {
                data.append('avatar', newImage)
            }
            if (state.login !== user.login) { data.append('login', state.login) }
            if (state.email !== user.email) { data.append('email', state.email) }
            if (state.password !== '' && confirmPassword !== '') {
                data.append('password', state.password)
                data.append('passwordComfirm', confirmPassword)
            }
            data.append('oldPassword', state.oldPassword)
            console.log(data.email)

            dispatch(updateUserData(data))

            setNewImage(null)

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
                setState(prevState => ({
                    ...prevState,
                    [name]: value,
                    errMessage: ''
                }));
                break;
            }
            case 'email': {
                setState(prevState => ({
                    ...prevState,
                    [name]: value,
                    errMessage: ''
                }));
                break;
            }
            case 'oldPassword': {
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
        // <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
        //<div className="glowbox-diagonales w-2/3 rounded-3xl">
        <div className="diagonal-gridlines w-1/2 glowbox-diagonales">
            <div className="flex flex-row items-center ml-16">
                <button
                    onClick={cancelHandler}
                    className="glowbox-del red text-white w-fit cursor-pointer px-2 py-1 mt-4 h-fit text-[18px]">
                    Cancel
                </button>
                <div className="glitch-box">
                    <h3 className="glitch-text" data-text='Edit info'>Edit info</h3>
                </div>
            </div>
            <div></div>

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
                            <img className='w-40' src={`http://localhost:8080/api/static/${user.avatar}`} alt={user.avatar} />
                        }
                        {newImage &&
                            <img className='w-40' src={URL.createObjectURL(newImage)} alt={newImage.name} />
                        }
                    </div>
                </div>

                <div className={'field flex-col my-3 w-full'}>
                    <div className="flex justify-between items-center">
                        <label className="glow text">Login</label><span className="text-2xl text-red-700"> *</span>
                    </div>
                    <input
                        type="text"
                        className="text-white p-2"
                        //   required="required"
                        name="login"
                        value={state.login}
                        onChange={changeHandler}
                    />
                </div>

                <div className={'field flex-col my-3 w-full'}>
                    <div className="flex justify-between items-center">
                        <label className="glow text">Email</label><span className="text-2xl text-red-700"> *</span>
                    </div>
                    <input
                        type="text"
                        className="text-white p-2"
                        //   required="required"
                        name="email"
                        value={state.email}
                        onChange={changeHandler}
                    />
                </div>

                <div className="border-[2px] card-border .password-card glowbox bg-opacity-50 mt-8 mb-6 p-4">
                    <div className="glitch-text uppercase">Change password</div>

                    <div className={`field flex-col my-3 w-full`}>
                        <div className="flex justify-between items-center">
                            <label className="glow text">New password</label>
                        </div>
                        <input
                            type="password"
                            className="text-white p-2"
                            name="password"
                            value={state.password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={`field flex-col my-3 w-full`}>
                        <div className="flex justify-between items-center">
                            <label className="glow text">Repeat password</label>
                        </div>
                        <input
                            type="password"
                            className="text-white p-2"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={`field flex-col my-3 w-full`}>
                    <div className="flex justify-between items-center">
                        <label className="glow text">Current password</label><span className="text-2xl text-red-700"> *</span>
                    </div>
                    <input
                        type="password"
                        className="text-white p-2"
                        name="oldPassword"
                        value={state.oldPassword}
                        onChange={changeHandler}
                    />
                </div>

                <div className="flex gap-8 items-center justify-center mt-4">
                    <button
                        onClick={submitHandler}
                        className="glowbox blue text-white w-fit cursor-pointer px-2 py-1 mt-4 h-fit text-[18px]">
                        Save changes
                    </button>
                    <button
                        onClick={cancelHandler}
                        className="glowbox-del red text-white w-fit cursor-pointer px-2 py-1 mt-4 h-fit text-[18px]">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        // </div>
    );
};
export default EditProfile;