import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../redux/CanvasSlice';
import { getAllCategories } from '../redux/categoriesSlice';
import axios from 'axios';
import { dataURItoBlob } from '../functions/toBlob';
import { createPost, getAllPosts, reportPost, updatePost } from '../redux/postsSlice';

const apiPath = 'http://localhost:8080/api';

const ReportForm = ({data, closeForm}) => {
    // console.log(data)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllProjects());
    //     dispatch(getAllCategories());
    // }, [dispatch]);

    const [reportReason, setReason] = useState('');

    const handleSubmit = () => {
        console.log('id', data.id, 'reason:', reportReason)
        dispatch(reportPost({id: data.id, reportReason: reportReason}));
        closeForm();
    }

    return (
        <div className="form-background">
            <div className="form-container">
                {/*content*/}
                <div className="form-content-container">
                    {/*header*/}
                    <div className="form-header-container">
                        <h3 className="form-header-title">
                            Reporting post
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeForm}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="form-body-container">
                        <div className='w-full form-body-item-container'>
                            <label className='text-center w-1/4'>Reason of reporting:</label>
                            <input type={"text"}
                                className="border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-2/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                name='title' onChange={(e)=>{setReason(e.target.value)}}
                                placeholder='Reason?'
                                defaultValue={reportReason}
                            />
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="form-footer-container">
                        <button
                            className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-350"
                            type="button"
                            onClick={closeForm}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={handleSubmit}
                        >Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportForm;

