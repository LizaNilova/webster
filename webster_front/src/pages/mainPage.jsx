import React from "react";
import {useSelector} from "react-redux"

export const MainPage = () => {
    const {user} = useSelector(state=> state.user)
    return <div>{user.name}</div>
}
