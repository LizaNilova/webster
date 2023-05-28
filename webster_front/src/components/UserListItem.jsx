import React from "react";
import { useNavigate } from "react-router-dom";

const UserListItem = ({ user }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-row h-fit   cursor-pointer hover:bg-opacity-60 text-sm px-3 py-2 w-full border-[2px] bg-lilovii border-beige text-black rounded-md"
    onClick={() => {navigate(`/users/${user.id}`)}}>
      <img src={`http://localhost:8080/api/static/${user.avatar}`} alt='avatar' className="w-24 rounded-xl" />
      <div className="flex flex-col w-4/5 align-middle items-center justify-center space-y-3">
        <p className="text-[18px] text-dark-purple"><b>{user.login}</b></p>
      </div>

    </div>
  );
};
export default UserListItem;