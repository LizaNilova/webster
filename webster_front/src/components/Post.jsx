import React from 'react';

const Post = () => {
    return (
        <div className='w-5/6 flex flex-col justify-center items-center border-purple-800 border m-2 p-2 rounded-xl'>
            <div className='w-full flex px-4 p-1 justify-between'>
                <div className='w-1/3 flex'>
                    <div>
                        <img src='папич.jfif' className='w-14 h-14 rounded-full' />
                    </div>
                    <div className='ml-7 flex flex-col items-center justify-center'>
                        <div className='text-lg'>Nickname</div>
                        <div className='text-sm'>22.12.28 13:37</div>
                    </div>
                </div>
                <div className='w-2/4 flex items-center text-2xl font-semibold'>
                    Name of post
                </div>
            </div>
            <div className='w-6/7 text-sm text-justify'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id ligula ac tellus tincidunt bibendum et id neque. Praesent sit amet ornare ante, feugiat hendrerit dui. Ut ut hendrerit dui, tempor iaculis arcu. Aenean tincidunt, elit vel semper maximus, sapien ipsum rhoncus magna, eget commodo leo neque vel diam. Aliquam tincidunt, elit a congue lacinia, augue nisi semper justo, at lobortis lectus metus quis mi. Suspendisse euismod feugiat aliquam. Maecenas eu euismod nibh. Suspendisse molestie est porttitor, lacinia lorem vel, sollicitudin neque. Nulla facilisi. Duis condimentum suscipit orci non maximus.
            </div>
            <div className='w-5/6 flex justify-center'>
                <img src='logo.png' className='max-w-full m-1 p-1 rounded-xl' />
            </div>
            {/*Likes, comments*/}
            <div className='w-full flex p-1 justify-around'>
                <div className='p-1 mx-2 flex justify-center items-cente cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <div className='ml-1'>1</div>
                </div>
                <div className='p-1 mx-2 flex justify-center items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    <div className='ml-1'>1</div>
                </div>
                <div className='p-1 mx-2 flex justify-center items-center cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div className='ml-1'>1</div>
                </div>
            </div>
        </div>
    );
}

export default Post;
