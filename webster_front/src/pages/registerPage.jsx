import React from "react";
import { useState } from "react";
import { registerUser } from "../redux/authSlice";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import '../styles/registerPage.css'
import { useEffect } from "react";
import '../styles/registerPage.scss'

export const RegistrationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const { status } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status === 'Send mail') {
            navigate('/')
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({
                login,
                password,
                email,
                passwordComfirm: repeatPassword
            }))

        } catch (error) {
            console.log(error)
        }
    }

    return <form
        onSubmit={e => e.preventDefault()}
        className="main-container">
        <div className="card diagonal-gridlines card-border bb">
            <h3 className="card_title">sign up</h3>
            <div className="separator"></div>
            <div className="flex flex-col my-3 w-full">
                <span className="">Login</span>
                <input
                    type="text"
                    required="required"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    className="card-input" />
            </div>

            <div className="flex flex-col my-3 w-full">
                <span className="">Email</span>
                <input
                    type="text"
                    required="required"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="card-input" />
            </div>

            <div className="flex flex-col my-3 w-full">
                <span>Password</span>
                <input
                    type="password"
                    required="required"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="card-input" />

            </div>
            <div className="flex flex-col my-3 w-full">
                <span>Confirm password</span>
                <input
                    type="password"
                    required="required"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                    className="card-input" />

            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="w-fit mt-5">
                    <button className="button btn-skew" type='submit' onClick={handleSubmit} >Create account</button>
                </div>
                <Link
                    to='/'
                    className="flex justify-center items-center text-xs m-5 text-beige hover:text-gray-200 hover:transition-[1s]"
                >Already have an account?</Link>
            </div>

        </div>
    </form>
}