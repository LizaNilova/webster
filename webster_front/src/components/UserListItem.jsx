import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../redux/userSlice";
import '../styles/profile.scss'

const UserListItem = ({ user }) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-row h-fit  cursor-pointer hover:bg-opacity-60 text-sm px-3 py-5 w-full border-[2px] glowbox-user-item rounded-md"
    onClick={() => { navigate(`/users/${user.id}`)}}>
      <img src={`http://localhost:8080/api/static/${user.avatar}`} alt='avatar' className="w-24 rounded-xl" />
      <div className="flex flex-col w-4/5 align-middle items-center justify-center space-y-3">
        <p className=""><b>{user.login}</b></p>
      </div>

    </div>
  );
};
export default UserListItem;