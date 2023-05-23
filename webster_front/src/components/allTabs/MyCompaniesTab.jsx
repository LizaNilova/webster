import React, { useState } from "react";
import { useSelector } from "react-redux";

// import TabNavItem from "../TabNavItem"
// import TabContent from "../TabContent";
// import '../../styles/TabsStyles.css'
// import '../../styles/ScrollbarStyles.css'
// import CompanyListItem from "../CompanyListItem";

const MyCompaniesTab = () => {
  // const [activeTabMembers, setActiveTabMembers] = useState("companies")
  // const { user } = useSelector((state) => state.auth)
  // const { company } = useSelector((state) => state.company)
  // const arrayItemsCount = (array) => { if (array) { return array.length } else { return '0' } }

  return (
    <div className="min-h-[519px] bg-dark-purple bg-opacity-80 p-[1rem] text-sm text-beige border-[2px] border-beige rounded-2xl">
      <ul className="Horizontalnav">
        <TabNavItem title={`${arrayItemsCount(user.companies)} companies`} id="companies" activeTab={activeTabMembers} setActiveTab={setActiveTabMembers} />
      </ul>
      <div>
        <TabContent id="companies" activeTab={activeTabMembers}>
          {user.companies?.length < 1 &&
            <div className="text-beige m-auto text-md h-full w-full">
              No companies, where you are a member...
            </div>}
          {user.companies?.length > 0 && <ul className="w-full pr-5 space-y-3 first-letter overflow-y-scroll scrollbar h-[400px]">
            {user.companies?.map((company, index) => (
              <CompanyListItem
                key={index}
                company={company} />))}
          </ul>}
        </TabContent>
      </div>
    </div>);
};
export default MyCompaniesTab;