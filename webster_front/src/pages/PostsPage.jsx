import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/postsSlice';
import PostForm from '../components/PostForm';
import { getAllCategories } from '../redux/categoriesSlice';
import '../styles/PostsPage.css'
import ReportForm from '../components/reportForm';

const PostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const meta = useSelector(state => state.posts.meta);
    const user = useSelector((state) => state.user.user);
    // console.log(user);

    const categories = useSelector(state => state.categories.categories);

    const [form, openForm] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('date');
    const [filter, setFilter] = useState([]);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        console.log('filters:', filter)
        dispatch(getAllPosts({ sort: sort, filter: JSON.stringify(filter), search: search, page: curPage }));
        dispatch(getAllCategories());
    }, [dispatch, search, sort, filter, curPage]);

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

    const triggerUpdate = () =>{
        console.log('update trigger');
        setTimeout(()=>{
            dispatch(getAllPosts({ sort: sort, filter: JSON.stringify(filter), search: search, page: curPage }));
        }, 500);
        
    }

    // console.log(categories)

    return (
        <>
            {form && form.method !== 'Report' && <PostForm data={form.data} closeForm={() => { openForm(null); triggerUpdate() }} />}
            {form && form.method === 'Report' && <ReportForm data={form.data} closeForm={() => { openForm(null);}}/>}
            <div className='posts-page-container'>
                <div className='posts-page-filters-container'>
                    {user?.role !== 'ADMIN' && <button onClick={() => { openForm('Create') }} className='posts-page-filters-button'>Create</button> }
                    <div className='text-xl mb-3'>Search post:</div>
                    <div className='w-full m-1'>
                        <input autoComplete='off' type="text" name="search"
                            className='posts-page-filters-text-input'
                            placeholder='Input name of post ...'
                            onChange={(e) => { setSearch(e.target.value) }} />
                    </div>
                    <div className='posts-page-filters-header'>
                        Filters by categories:
                    </div>
                    <div className='posts-page-filters-categories-container'>
                        {
                            categories && categories.map(category => {
                                // console.log(filter.findIndex(f_category => f_category === category.value))
                                return (
                                    <div className='posts-page-filters-category'>
                                        <input type='checkbox' className='w-5 h-5' defaultChecked={!Boolean(filter.findIndex(f_category => f_category === category))} onChange={(e) => {
                                            let idx = filter.findIndex(f_category => f_category === category);
                                            if (idx < 0) {
                                                let new_filters = [...filter];
                                                new_filters.push(category);
                                                setFilter(new_filters);
                                            } else {
                                                let new_filters = [...filter];
                                                new_filters.splice(idx, 1);
                                                setFilter(new_filters);
                                            }
                                        }} />
                                        <p className='pl-2 text-lg'>{category}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='posts-page-filters-header'>
                        Sort by:
                    </div>
                    <div className='posts-page-filters-select-container'>
                        <select className='posts-page-filters-select' onChange={(e) => {
                            setSort(e.target.value);
                        }}>
                            <option value='date'>Date</option>
                            <option value='byCategories'>Categories</option>
                        </select>
                    </div>
                </div>
                {/*container*/}
                <div className='posts-page-posts-container'>
                    {posts && posts.map(post => {
                        return (
                            <Post data={post} openForm={openForm} triggerUpdate={triggerUpdate}/>
                        )
                    })}
                    {meta.totalPages !== 1 ?
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
