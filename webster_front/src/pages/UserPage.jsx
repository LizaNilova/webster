import React from "react";
import { useSelector } from 'react-redux'
import ProfileTab from "../components/ProfileTab";

export const UserPage = () => {
    const { user } = useSelector(state => state.user)

    if (!user) {
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
                        onClick={() => {  }}>
                        <img className="w-6" src='editing_icon.png' alt='edit info' />
                        Subscribe
                    </div>
                </div>}



                <div className="w-1/2 ">

                    <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">

                        {!editBoxOpen && <>

                        </>}
                    </div>
                </div>
            </div>

            <div>
                My posts

            </div>
        </div >
    </div>
}