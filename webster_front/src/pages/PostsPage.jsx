import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/postsSlice';
import PostForm from '../components/PostForm';
import { getAllCategories } from '../redux/categoriesSlice';

const PostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const meta = useSelector(state => state.posts.meta)
    const categories = useSelector(state => state.categories.categories);

    const [form, openForm] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('date');
    const [filter, setFilter] = useState([]);
    const [curPage, setCurPage] = useState(1);
    
    useEffect(() => {
        dispatch(getAllPosts({sort: sort, filter: JSON.stringify(filter), search: search, page: curPage}));
        dispatch(getAllCategories());
    }, [dispatch, search, sort, filter, curPage]);

    const getPageCount = (count) => {
        const result = [];
        for (let i = 1; i <= count; i += 1) {
          result.push(
            <li key={i}>
              <button
              onClick={() => setCurPage(i)}
                class={`px-3 py-2 border border-gray-600 rounded-none ${i === curPage ? 'bg-gray-700 text-white': 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              >
                {i}
              </button>
            </li>
          );
        }
        // console.log(result)
        return result;
      };
    //   console.log(categories)
    return (
        <>
            {form && <PostForm data={form} closeForm={() => { openForm(null) }} />}
            <div className='w-full h-full min-h-screen flex bg-dark-purple justify-around text-white'>
                <div className='w-1/5 h-fit flex flex-col justify-center items-center sticky top-28 z-10'>
                    <button onClick={() => { openForm('Create') }} className='w-2/3 bg-purple-700 m-3'>Create</button>
                    <div className='text-xl mb-3'>Search post:</div>
                    <div className='w-full m-1'>
                        <input autoComplete='off' type="text" name="search"
                            className='w-full text-base p-3 border-2 border-beige focus:border-purple-600 rounded-lg h-full outline-none bg-light-beige text-black'
                            placeholder='Input name of post ...'
                            onChange={(e)=>{setSearch(e.target.value)}} />
                    </div>
                    <div className='text-xl my-3'>
                        Filters by categories:
                    </div>
                    <div className='w-full flex flex-wrap justify-around m-1'>
                        {
                            categories && categories.map(category => {
                                // console.log(filter.findIndex(f_category => f_category === category.value))
                                return (
                                    <div className='flex items-center justify-center p-2'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={!Boolean(filter.findIndex(f_category => f_category === category))} onChange={(e)=>{
                                            let idx = filter.findIndex(f_category => f_category === category);
                                            if(idx < 0)
                                            {
                                                let new_filters = [...filter];
                                                new_filters.push(category.value);
                                                setFilter(new_filters);
                                            } else {
                                                let new_filters = [...filter];
                                                new_filters.splice(idx, 1);
                                                setFilter(new_filters);
                                            }
                                        }}/>
                                        <p className='pl-2 text-lg'>{category}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='text-xl my-3'>
                        Sort by:
                    </div>
                    <div className='w-full flex flex-wrap justify-around m-1'>
                        <select className='w-full text-black text-lg p-2 m-1 rounded-lg' onChange={(e)=>{
                            setSort(e.target.value);
                        }}>
                            <option value='date'>Date</option>
                            <option value='byCategories'>Categories</option>
                        </select>
                    </div>
                </div>
                {/*container*/}
                <div className='w-3/5 flex flex-col items-center border-l border-purple-800'>
                    {posts && posts.map(post => {
                        return (
                            <Post data={post} openForm={openForm}/>
                        )
                    })}
                    { meta.totalPages !== 1 ?
                    <div >
                        <ul class="inline-flex -space-x-px">
                            {getPageCount(meta.totalPages)}
                        </ul>
                    </div> : ''
                    }
                </div>
            </div>
        </>
    );
}

export default PostsPage;
