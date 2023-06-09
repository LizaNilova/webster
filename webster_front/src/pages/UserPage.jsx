import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Post from "../components/Post";
import { getUserById, subscribeUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { getUsersPosts } from "../redux/postsSlice";

export const UserPage = () => {
    const [form, openForm] = useState(null);
    const [curPage, setCurPage] = useState(1);

    const { anotherUser } = useSelector((state) => state.user)
    const { usersPosts } = useSelector((state) => state.posts)
    const { usersMeta } = useSelector((state) => state.posts)
    const { subscriptions } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const params = useParams()

    const [subscribed, setSubscribed] = useState(() => {
        for (let i = 0; i < subscriptions.length; i++) {
            if (params.id === subscriptions[i].id) {
                return true
            }
        }
        return false
    })

    useEffect(() => {
        console.log(params.id)
        dispatch(getUserById(params.id))
        dispatch(getUsersPosts(params.id))
    }, [dispatch, params.id])


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

    const subscribeToUser = () => {
        dispatch(subscribeUser(params.id))
        setSubscribed(isSubscribed())
    }

    const isSubscribed = () => {
        for (let i = 0; i < subscriptions.length; i++) {
            if (anotherUser.user.id === subscriptions[i].id) {
                return true
            }
        }
        return false
    }

    if (!anotherUser) {
        return <div className="box-border flex justify-center items-center min-h-[100vh] bg-dark-purple">
            <div className="registerCard">
                <img className="h-[100px] mt-4" src='../uevent_logo.png' alt='logo' />
                <h3 className="uppercase tracking-[2px] text-light-beige mt-4 text-xl">Loading...</h3>
                <p className="text-center text-beige p-2 mb-8">Wait for a minute for loading... If it's loading too long, please, refresh this page.</p>
                <div className="flex flex-col gap-2 pb-12 items-center justify-center">
                </div>
            </div>
        </div>
    }

    return <div className="main-container flex-col p-10 h-fit min-h-screen ">
        <div  className="flex flex-col bg-opacity-30 w-5/6 diagonal-gridlines glowbox-diagonales items-center text-center min-h-[400px] space-y-4 p-6">
            <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

                <div className="justify-center w-40 mt-5 ">
                    <img alt={anotherUser.user.avatar} className="items-center rounded-[3rem]"
                        src={`http://localhost:8080/api/static/${anotherUser.user.avatar}`}
                    />
                </div>

                {/* Login */}
                <div className='glitch-box' >
                  <div data-text={anotherUser.user.login} className="text-[25px] glitch-text">{anotherUser.user.login}</div>
                </div>
                {subscribed && <div className='w-fit'>
                    <button
                        className="button btn-cyber-punk mt-5"
                        onClick={subscribeToUser}>
                        Subscribe
                    </button>
                </div>}
                {!subscribed && <div className='w-fit'>
                    <button
                        className="button btn-cyber-punk mt-5"
                        onClick={subscribeToUser}>
                        Following
                    </button>
                </div>}
            </div>

            <div className='flex flex-col w-2/3 justify-center items-center'>
                {!usersPosts && <div className="text-beige m-auto text-md h-full w-full">
                    User have not any posts yet...
                </div>}
                {usersPosts && usersPosts.map((post, i) => {
                    return (
                        <Post iter={i} data={post} openForm={openForm} />
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
    </div >

}