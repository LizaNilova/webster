import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/authSlice.js'
import '../styles/loginPage.scss'

export const RegistrationPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    const { status } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'You are signed in') {
            navigate('/home-page')
        }
        console.log(status)
        setErrorText(status)
        if (status !== 'Send mail' && status) {
            setErrorVisible(true)
        } else {
            setErrorVisible(false)
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({
                username_or_email: login,
                password,
            }))
            setErrorText(status)

        } catch (error) {
            console.log(error)
        }
    }

    const closeError = () => {
        setErrorVisible(false)
    }

    return (
        <form
            onSubmit={e => e.preventDefault()}
            className="main-container">
            {/* <div className="card-border"> */}
                <div className="card diagonal-gridlines card-border bb">
                    {/* <img className="h-[100px] mt-4" src='uevent_logo.png' alt='logo' /> */}
                    <h3 className="card_title">sign in</h3>
                    <div className="separator"></div>

                    <div className="relative w-[250px]">
                        <input
                            type="text"
                            required="required"
                            value={login}
                            onChange={e => setLogin(e.target.value)} />
                        <span className="">Login/email</span>
                    </div>

                    <div className="relative w-[250px]">
                        <input
                            type="password"
                            required="required"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                        <span className="password-span">Password</span>
                    </div>

                    {
                        errorVisible &&
                        <div className="flex flex-col rounded-lg bg-purple-400 p-2 pt-1 bg-opacity-20 border-0">
                            <div className="flex justify-end">
                                <Link
                                    className="flex text-center justify-center w-fit h-fit rounded-sm pr-1 pl-1 text-xs text-beige"
                                    onClick={closeError}
                                >x</Link>
                            </div>

                            <p className="items-center text-sm mb-2 text-yellow-500"><b>{errorText}</b></p>

                        </div>
                    }


                    <div className="flex flex-col gap-2 items-center justify-center">
                        <Link
                            to='/auth/resetPassword'
                            className="flex justify-center items-center text-xs text-beige hover:text-light-beige hover:transition-[1s]"
                        >Forgot password?</Link>
                        <button className="button btn-skew" type='submit' onClick={handleSubmit} >Log in</button>
                        <Link
                            to='/registration'
                            className="flex justify-center items-center text-xs m-5 text-beige hover:text-light-beige hover:transition-[1s]"
                        >Create an account</Link>
                    </div>
                </div>
            {/* </div> */}
        </form>
    )
}