import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RecoverPasswordPage } from '../pages/RecoverPasswordPage';
import {MainPage} from '../pages/mainPage';
import { RegistrationPage } from '../pages/registerPage';
import { LoginPage } from '../pages/loginPage';
// import { ResetPasswordPage } from '../pages/ResetPasswordPage';
// import EventView from '../components/EventView';
// import { Profile } from '../pages/Profile';
// import CheckOutSuccess from '../pages/CheckOutSuccess';
// import CalendarPage from '../pages/CalendarPage';
import Header from '../components/Header';
import { ConfirmPage } from '../pages/confirmPage';
// import { VerifyCompanyEmailPage } from '../pages/VerifyCompanyEmailPage';
// import { CompanyPage } from '../pages/CompanyPage';
// import { VerifyInvite } from '../pages/VerifyInvite';

export const useRoutes = (isAuthenticated) => {

    if (isAuthenticated) {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    {/* <Route path="/checkout-success/:cartItems" element={<CheckOutSuccess />} /> */}
                    {/* <Route path="/events/:id" element={<EventView />} /> */}
                    {/* <Route path="/calendar" element={<CalendarPage />} /> */}
                    {/* <Route path="/events/:event_id/company/:company_id" element={<CompanyPage />} /> */}
                    <Route path='/confirm/:id' element={<ConfirmPage/>} />
                    {/* <Route path="companies/:id/add-new-member" element={<VerifyInvite />} /> */}
                    {/* <Route path="verify_company/:token" element={<VerifyCompanyEmailPage />} /> */}
                    {/* <Route path="/events/:event_id/companies/:company_id" element={<CompanyPage/>}/> */}
                    {/* <Route path="companies/:company_id" element={<CompanyPage/>}/> */}
                    <Route path='/profile' element={<Profile />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </>
        )
    } else {
        return (
            <div className='flex flex-col w-full h-screen'>
            <Header />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* <Route path="/events/:id" element={<EventView />} /> */}
                {/* <Route path="/events/:event_id/company/:company_id" element={<CompanyPage />} /> */}

                
                {/* <Route path="/auth" element={<LoginPage />} /> */}
                <Route path="/auth/resetPassword" element={<RecoverPasswordPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                {/* <Route path='recover/:token' element={<ResetPasswordPage />} /> */}
                <Route path='/confirm/:id' element={<ConfirmPage/>} />



                <Route path='/confirm' element={<ConfirmPage/>} />
                
                {/* <Route path="companies/:id/add-new-member" element={<VerifyInvite />} /> */}
                {/* <Route path="verify_company/:token" element={<VerifyCompanyEmailPage />} /> */}

                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
            </div>

        )
    }
}