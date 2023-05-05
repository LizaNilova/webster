import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {

    const logoutClick = () => {

    }

    return (
        <>
            <div className='px-8 py-3 border-b-2 border-slate-700 flex w-full bg-dark-purple justify-between ' >
                <div className='w-1/6 flex flex-row justify-between'>
                    <div className='h-14 w-28'>
                        <img src="logo.png" alt='logo' className='rounded-full hover:cursor-pointer' onClick={() => { navigate('/') }} />
                    </div>
                </div>
                <div className='w-1/4 flex flex-row justify-between items-center'>
                    <Link to='/' className='flex justify-center items-center text-lg m-5 text-beige hover:animate-pulse'>Main page</Link>
                    <Link to='/' className='flex justify-center items-center text-lg m-5 text-beige hover:animate-pulse'>Profile</Link>
                    <Link to='/' className='flex justify-center items-center text-lg m-5 text-beige hover:animate-pulse'>Calendar</Link>
                </div>
                <div className='w-1/4 flex flex-row justify-end'>
                    <div className='w-1/2 flex flex-col items-end justify-center'>
                        <button
                            className="flex items-center justify-around border border-purple-900 rounded-full w-2/3 p-3 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold text-lg "
                            onClick={logoutClick}
                        >
                            <div>Logout</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
