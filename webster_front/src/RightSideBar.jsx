import React from 'react';

const RightSideBar = ({}) => {
    return (
        <div className='w-1/6 h-full min-h-screen flex flex-col items-center p-2 border-l-2 border-purple-900'>
            <button  className='w-2/3 bg-purple-700 m-2'>Create new canvas</button>
            <button  className='w-2/3 bg-purple-700 m-2 active:border-green-500 outline-none'>Drawing mode</button>
            <button  className='w-2/3 bg-purple-700 m-2'>Remove selected object</button>
        </div>
    );
}

export default RightSideBar;
