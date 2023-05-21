import React from 'react';
import Post from './Post';

const PostsPage = () => {
    return (
        <div className='w-full h-full min-h-screen flex bg-dark-purple justify-around'>
            <div className='w-1/6 h-fit flex flex-col justify-center items-center sticky top-28 z-10'>
                <div className='text-xl mb-3'>Search post:</div>
                <div className='w-full m-1'>
                    <input autoComplete='off' type="text" name="search" 
                        className='w-full text-base p-3 border-2 border-beige focus:border-purple-600 rounded-lg h-full outline-none bg-light-beige text-black' 
                        placeholder='Input name of post ...'/>
                </div>
                <div className='text-xl my-3'>
                    Filters by categories:
                </div>
                <div className='w-full flex flex-wrap justify-around m-1'>
                    <div className='flex items-center justify-center p-2'>
                        <input type='checkbox' className='w-5 h-5' />
                        <p className='pl-2 text-lg'>Brownie</p>
                    </div>
                    <div className='flex items-center justify-center p-2'>
                        <input type='checkbox' className='w-5 h-5' />
                        <p className='pl-2 text-lg'>Brownie</p>
                    </div>
                    <div className='flex items-center justify-center p-2'>
                        <input type='checkbox' className='w-5 h-5' />
                        <p className='pl-2 text-lg'>Brownie</p>
                    </div>
                    <div className='flex items-center justify-center p-2'>
                        <input type='checkbox' className='w-5 h-5' />
                        <p className='pl-2 text-lg'>Brownie</p>
                    </div>
                    <div className='flex items-center justify-center p-2'>
                        <input type='checkbox' className='w-5 h-5' />
                        <p className='pl-2 text-lg'>Brownie</p>
                    </div>
                </div>
            </div>
            {/*container*/}
            <div className='w-3/5 flex flex-col items-center border-l border-purple-800'>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    );
}

export default PostsPage;
