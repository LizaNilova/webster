import React, { useEffect, useState } from "react";
import TabNavItem from "./TabNavItem"
import TabContent from "./TabContent";
import '../styles/TabsStyles.css'
import ProfileTab from "./allTabs/ProfileTab";
import MyCompanyTab from "./allTabs/MyCompanyTab";
import { useDispatch, useSelector } from "react-redux";
// import { getMembers, getMyCompany } from "../redux/companySlice";
import MyCompaniesTab from './allTabs/MyCompaniesTab'

const ProfilePageTabs = () => {
    const [activeTab, setActiveTab] = useState("profile");
    // const { company } = useSelector((state) => state.company)
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getMyCompany())
        // dispatch(getMembers(company?._id))
    }, [dispatch])
    return (
        <div className="flex flex-row w-full min-w-[400px] bg-dark-purple py-[1rem] px-[2rem] text-beige space-x-4"
        >
            <ul className="nav">
                <TabNavItem title="PROFILE" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title="MY COMPANIES" id="myCompanies" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem title="MY OWN COMPANY" id="myCompany" activeTab={activeTab} setActiveTab={setActiveTab} />
            </ul>

            <div className="w-4/5">
                <TabContent id="profile" activeTab={activeTab}>
                    <ProfileTab />
                </TabContent>
                <TabContent id="myCompanies" activeTab={activeTab}>
                    <MyCompaniesTab />
                </TabContent>
                <TabContent id="myCompany" activeTab={activeTab}>
                    <MyCompanyTab />
                </TabContent>
            </div>
        </div>
    );
};

export default ProfilePageTabs;