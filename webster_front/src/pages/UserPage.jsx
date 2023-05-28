import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Post from "../components/Post";
import { getUserById } from "../redux/userSlice";
import { useParams } from "react-router-dom";

export const UserPage = () => {
    const { anotherUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const params = useParams()
    useEffect(() => {
        console.log(params.id)
        dispatch(getUserById(params.id))
    }, [anotherUser])
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

    return <div className='flex flex-col justify-center items-center w-full h-screen bg-dark-purple'>
        <div className="flex flex-col bg-opacity-30 w-2/3 bg-pomp-and-power border-opacity-30 text-[2rem] items-center text-center border-[1px] border-beige rounded-[2rem] min-h-[400px] space-y-4 p-6">
            <div className="flex flex-row space-x-4 w-2/3">
                <div className="flex w-1/2 flex-col text-[2rem] items-center text-center min-h-[400px]">

                    <div className="justify-center w-40 mt-5 ">
                        <img alt={anotherUser.user.avatar} className="items-center rounded-[3rem]"
                            src={`http://localhost:8080/api/static/${anotherUser.user.avatar}`}
                        />
                    </div>

                    {/* Login */}
                    <div className="text-[25px]">{anotherUser.user.login}</div>

                    <div
                        className="text-[16px] mt-5 flex  cursor-pointer flex-row space-x-3 px-3 py-2 rounded-3xl hover:bg-opacity-70 bg-beige border-dark-purple text-dark-purple"
                        onClick={() => { }}>
                        <img className="w-6" src='editing_icon.png' alt='edit info' />
                        Subscribe
                    </div>
                </div>

                <div className="w-1/2 ">

                    <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
                        <div className='posts-page-posts-container'>
                            {anotherUser.posts && anotherUser.posts.map(post => {
                                return (
                                    <Post data={post} openForm={() => {}} />
                                )
                            })}
                            {anotherUser.posts.meta.totalPages !== 1 ?
                                <div >
                                    <ul class="inline-flex -space-x-px">
                                        {getPageCount(meta.totalPages)}
                                    </ul>
                                </div> : ''
                            }
                        </div>

                    </div>
                </div>
            </div>

            <div>
                My posts

            </div>
        </div >
    </div>
}