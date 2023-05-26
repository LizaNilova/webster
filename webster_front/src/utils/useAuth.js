import { useEffect } from "react";
import { useDispatch} from 'react-redux';
import { userProfile } from "../redux/userSlice";

export default function useAuth()
{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userProfile());
      }, [dispatch]);
}