import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { confirmRegistration } from '../redux/authSlice.js'
import '../styles/loginPage.scss'

export const RecoverPasswordPage = () => {
    const [code, setCode] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    const { status } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (status === 'User comfirm account') {
            navigate('/')
        }
        console.log(status)
        setErrorText(status)
        if (status !== 'User comfirm account' && status) {
            setErrorVisible(true)
        } else {
            setErrorVisible(false)
        }
    }, [status, navigate])

    const handleSubmit = () => {
        try {
            dispatch(confirmRegistration({ code, id: params.id }))
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
            <div className="login-card diagonal-gridlines card-border bb-login">
                <div className="glitch-box">
                    <h3 className="glitch-text" data-text="recover password">recover password</h3>
                </div>

                <div className="separator"></div>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="flex flex-col my-3 w-full justify-center items-center">
                        <span className="glow text mb-6">Enter here your email with which you registered. <br />We will send you the necessary instructions to reset your password.</span>
                        <input
                            type="email"
                            required="required"
                            value={code}
                            className="w-2/3"
                            onChange={e => setCode(e.target.value)} />
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

                    {
                        !errorVisible &&
                        <div className="flex flex-col rounded-lg bg-purple-400 opacity-0 p-2 pt-1 bg-opacity-20 border-0">
                            <div className="flex justify-end">
                                <div
                                    className="flex cursor-default text-center justify-center w-fit h-fit rounded-sm pr-1 pl-1 text-xs text-beige"
                                    onClick={closeError}
                                >x</div>
                            </div>

                            <p className="items-center text-sm mb-2 text-yellow-500 cursor-default  "><b>Email is not registrated</b></p>

                        </div>
                    }


                    <div className="flex flex-col gap-2 mt-2 items-center justify-center">

                        <div className="w-fit">
                            <button className="button btn-skew" type='submit' onClick={handleSubmit} >SEND EMAIL</button>
                        </div>
                        <Link
                            to='/'
                            className="flex justify-center items-center text-xs mx-4 my-2 text-beige hover:text-light-beige hover:transition-[1s]"
                        >I remember password</Link>
                    </div>
                </div>

            </div>
        </form>
    )
}
